module Main exposing (main, init)

import Browser
import Html exposing (Html)
import Html.Events
import Html.Attributes
import Dict exposing (Dict)
import Tuple
import Http
import Json.Decode

-- MAIN

main : Program () Model Msg
main =
    Browser.element
        { init = init
        , subscriptions = subscriptions
        , view = view
        , update = update
        }

-- MODEL

type alias Chapter =
    { name : String
    , title : String
    , data : String
    }

type Checkpoint
    = Checkpoint State

type alias State =
    { section : String
    , chapters : Dict String String
    , titles : Dict String String
    , vars : Dict String Int
    , checkpoints : List Checkpoint
    , execEnv :
        { ifStatus : Bool
        }
    }

type SetOp
    = Assign
    | Incr
    | Decr

type CompOp
    = Equal
    | Greater
    | Less

type Action
    = Goto String
    | Set String SetOp Int
    | If String CompOp Int Action
    | Else Action
    | NoOp

type Line
    = Paragraph String (List String)
    | Header String (List String)
    | Branch String (List Action)
    | Divider
    | Void

type alias View =
    { lines : List Line
    }

type alias Model =
    { state : State
    , view : View
    , showDebug : Bool
    }

type Msg
    = None
    | SetState State
    | GotChapter Bool (Result Http.Error Chapter)

-- INIT

init : () -> ( Model, Cmd Msg )
init flags =
    (
        { state =
            { section = "Title"
            , chapters = Dict.empty
            , titles = Dict.empty
            , vars = Dict.fromList [("ability", 0)]
            , checkpoints = []
            , execEnv =
                { ifStatus = False
                }
            }
        , view =
            { lines = []
            }
        , showDebug = False
        }
    , fetchChapter True "Title"
    )

-- SUBSCRIPTIONS

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none

-- UPDATE

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SetState state ->
            let
                chapter = state.section
                chapterBody = Dict.get chapter state.chapters
                lineData = case chapterBody of
                    Just body ->
                        body
                            |> String.split "\n"
                            |> List.map String.trim
                    Nothing -> []
                lines = Tuple.second (parseLines lineData state { inputState = Body, hasCheckpoint = False })

                branchActions line =
                    case line of
                        Branch _ actions -> Maybe.Just actions
                        _ -> Maybe.Nothing
                gotoDestination action =
                    case action of
                        Goto destination -> Maybe.Just destination
                        _ -> Maybe.Nothing

                gotos = List.filterMap (branchActions) lines
                    |> List.concat
                    |> List.filterMap (gotoDestination)

                chapters = Dict.fromList [(chapter, Maybe.withDefault "" <| Dict.get chapter state.chapters)]
                titles = Dict.fromList [(chapter, Maybe.withDefault "" <| Dict.get chapter state.titles)]
            in
            (
                { model
                | state =
                    { state
                    | chapters = chapters
                    , titles = titles
                    }
                , view = { lines = lines}
                }
            , Cmd.batch (List.map (fetchChapter False) gotos)
            )
        GotChapter gotoChapter result ->
            case result of
                Ok chapter ->
                    let
                        state = model.state
                        newState =
                            { state
                            | chapters = Dict.insert chapter.name chapter.data state.chapters
                            , titles = Dict.insert chapter.name chapter.title state.titles
                            }
                    in
                    if gotoChapter
                    then update (SetState newState) model
                    else ( { model | state = newState }, Cmd.none )
                Err error ->
                    ( model, Cmd.none )
        None ->
            ( model, Cmd.none )

fetchChapter : Bool -> String -> Cmd Msg
fetchChapter gotoChapter name =
    Http.get
        { url = "./data/test/" ++ name ++ ".json"
        , expect = Http.expectJson (GotChapter gotoChapter) (chapterDecoder name)
        }

-- DECODERS

chapterDecoder : String -> Json.Decode.Decoder Chapter
chapterDecoder name =
  Json.Decode.map2 (Chapter name)
    (Json.Decode.field "title" Json.Decode.string)
    (Json.Decode.field "data" Json.Decode.string)

-- VIEW

statsView : Model -> Html Msg
statsView model =
    let 
        statsVarView key value =
            Html.text (key ++ " : " ++ (String.fromInt value))
    in
    if model.showDebug then
        Html.div [Html.Attributes.id "stats"]
            (Dict.map statsVarView model.state.vars
                |> Dict.values)
    else Html.text ""

checkpointsView : State -> Html Msg
checkpointsView state =
  let
    statsCheckpointView checkpoint =
        case checkpoint of
            Checkpoint checkpointState ->
                Html.span []
                    [ Html.a [ Html.Attributes.class "link", Html.Attributes.href "javascript:void(0)" ]
                        [ Html.text checkpointState.section
                        ]
                    , Html.br [] []
                    ]
  in
  Html.div [Html.Attributes.id "checkpoints"]
    <| List.map statsCheckpointView state.checkpoints

-- FUNCTIONS

set : SetOp -> Int -> Int -> Int
set op lval rval =
    case op of
        Incr -> (lval + rval)
        Decr -> (lval - rval)
        Assign -> (rval)

calc : CompOp -> Int -> Int -> Bool
calc op lval rval =
    case op of
        Greater -> (lval > rval)
        Less -> (lval < rval)
        Equal -> (lval == rval)

parseAction : String -> Result String Action
parseAction actionStr =
    let
        actionParts = String.split ":" actionStr
            |> List.map String.trim
        (action, argument) = case actionParts of
            [actionPart] ->
                (actionPart, "")
            [actionPart, argumentPart] ->
                (actionPart, argumentPart)
            _ ->
                ("", "")
    in case String.split " " action of
        ("goto" :: rest) ->
            Ok <| Goto (String.join " " rest)
        ["set", propName, op, val] ->
            let
                opToken = case op of
                    "=" -> Ok Assign
                    "+" -> Ok Incr
                    "-" -> Ok Decr
                    err -> Err ("Unknown operator \"" ++ err ++ "\"")
                intVal = case String.toInt val of
                    Just int -> Ok int
                    Nothing -> Err ("\"" ++ val ++ "\" is not a number")
            in
            Result.map2 (Set propName) opToken intVal
        ["if", propName, op, val] ->
            let
                opToken = case op of
                    "=" -> Ok Equal
                    ">" -> Ok Greater
                    "<" -> Ok Less
                    err -> Err ("Unknown operator \"" ++ err ++ "\"")
                intVal = case String.toInt val of
                    Just int -> Ok int
                    Nothing -> Err ("\"" ++ val ++ "\" is not a number")
            in
            Result.map3 (If propName) opToken intVal (parseAction argument)
        ["else"] ->
            Result.map Else (parseAction argument)
        _ ->
            Ok NoOp

parseBranch : String -> List Action
parseBranch branch =
    String.split ";" branch
        |> List.map String.trim
        |> List.map parseAction
        |> List.map Result.toMaybe
        |> List.filterMap identity

parseModifiers : String -> (String, List String)
parseModifiers string =
    case String.split "]" string of
        [text] ->
            (text, [])
        (modifiers_str :: text_list) ->
            let
                modifiers =
                    String.dropLeft 1 modifiers_str
                        |> String.split ","
                        |> List.map String.trim
                text = String.join "]" text_list
            in
                (text, modifiers)
        _ ->
            ("", [])

type InputState
    = Body
    | Branches

type alias LineMetadata =
    { inputState : InputState
    , hasCheckpoint : Bool
    }

parseLines : List String -> State -> LineMetadata -> (LineMetadata, List Line)
parseLines lines state metadata =
    case lines of
        [line] ->
            let
                (lineMetadata, lineHtml) = parseLine line state metadata
            in
                (lineMetadata, [lineHtml])
        (line :: follow) ->
            let
                (lineMetadata, lineHtml) = parseLine line state metadata
                (followMetadata, followHtml) = parseLines follow state lineMetadata
            in
                (followMetadata, [lineHtml] ++ followHtml)
        _ ->
            (metadata, [])

parseLine : String -> State -> LineMetadata -> (LineMetadata, Line)
parseLine line state metadata =
    case metadata.inputState of
        Body ->
            if String.left 1 line == "#" then
                let (text, modifiers) = parseModifiers(String.dropLeft 1 line)
                in
                ( metadata
                , Header text modifiers
                )
            else if String.left 2 line == "@[" then
                let (text, modifiers) = parseModifiers(String.dropLeft 1 line)
                in
                ( metadata
                , Paragraph text modifiers
                )
            else if line == "[CHOICES]" then
                ( { metadata | inputState = Branches }
                , Divider
                )
            else if line == "[CHECKPOINT]" then
                ( { metadata | hasCheckpoint = True }
                , Void
                )
            else
                ( metadata
                , Paragraph line []
                )
        Branches ->
            let
                branchParts = String.split "->" line
                    |> List.map String.trim
                (buttonText, branch) =
                    case branchParts of
                        [text] -> (text, "")
                        [text, action] -> (text, action)
                        _ -> ("", "")
                branchAction =
                    case String.split "#" branch of
                        (branchActionPart :: _) -> branchActionPart
                        _ -> branch
                newStateNoChecpoint = parseBranch branchAction
            in
                case List.length branchParts of
                    2 ->
                        ( metadata
                        , Branch buttonText (parseBranch branchAction)
                        )
                    _ ->
                        ( metadata
                        , Void
                        )

applyAction : Action -> State -> State
applyAction action state =
    case action of
        Goto section ->
            {state | section = section}
        Set var op val ->
            let
                varVal = Maybe.withDefault 0 (Dict.get var state.vars)
            in
                {state | vars = Dict.insert var (set op varVal val) state.vars}
        If var op val subAction ->
            let
                varVal = Maybe.withDefault 0 (Dict.get var state.vars)
                cond = calc op varVal val
                execEnv = state.execEnv
                newState = { state | execEnv = { execEnv | ifStatus = cond } }
            in
                if cond
                then applyAction subAction newState
                else newState
        Else subAction ->
            if not state.execEnv.ifStatus
            then applyAction subAction state
            else state
        NoOp ->
            state

applyBranch : List Action -> State -> State
applyBranch actions state =
    case actions of
        [] ->
            state
        [action] ->
            applyAction action state
        (action :: rest) ->
            let
                newState = applyAction action state
            in
                applyBranch rest newState

applyModifier : String -> Html.Attribute Msg
applyModifier modifier =
    case modifier of
        "center" -> Html.Attributes.align "center"
        _ -> Html.Attributes.class "error"

applyModifiers : List String -> List (Html.Attribute Msg)
applyModifiers modifier =
    List.map applyModifier modifier

lineView : State -> Line -> Html Msg
lineView state line =
    case line of
        Paragraph text options ->
            Html.p (applyModifiers options)
                [ Html.text text
                ]
        Header text options ->
            Html.h1 (applyModifiers options)
                [ Html.text text
                ]
        Branch text actions ->
            Html.a [Html.Attributes.class "branch", Html.Events.onClick (SetState (applyBranch actions state)), Html.Attributes.style "cursor" "pointer"]
                [ Html.text text
                ]
        Divider ->
            Html.hr [] []
        Void ->
            Html.text ""

chapterView : Model -> Html Msg
chapterView model =
    let
        state = model.state
    in
        Html.div []
            [ Html.div [Html.Attributes.id "book"]
                 <| List.map (lineView model.state)
                 <| List.filter (\line -> line /= Void) model.view.lines
            , statsView model
            , checkpointsView state
            ]

view : Model -> Html Msg
view model =
    chapterView model
