const data = {
  "demo":`
    This is an example chapter.
    In it nothing really happens, but at least it exists.
    Maybe other chapters will be more exciting? Hopefully.
    Would be sad if they werent.
    Anyways, that is probably enough text for now, here comes the branches:

    ***
    [Write a better book] -> goto section 3
    <br>
    [Write a bad book] -> set ability - 4; goto section 2
    <br>
    [Write this book] -> if ability = 0: goto section 1; else: goto section 2
    ***`,
  "0": `
    #[center]Assassinating the Elven King

    @[center]by Aurora Borden

    <br>

    ***
    [Continue] -> goto section 1
    ***`,
  "1": `
    I hear something fly past my head and land with a thud disturbingly close to my ear. Laughter erupts from in front of me and I open my eyes to see the moon elf doubled over and pointing at me. “You should have seen your face!” she managed to gasp out. 
    “Could we perhaps not kill each other before our mission even starts?” A voice called from the tents set up a short distance away from us. Jia, the other half elf besides myself is striding towards us, an annoyed look on her face.
“Oh relax, Jia,” replies Eleni, the moon elf. “I was just getting in some target practice.” She sneers with a glint in her eyes that would send more sane people running.
    Jia simply crosses her arms and turns her disapproving glare to me. “I expected this from her, honestly... But you too, Vargon?” 

    ***
    [Agree with Eleni] -> set Eleni_relation + 2; set Jia_relation - 2; goto section 2
    [Apologize]        -> set Jia_relation + 2; set Eleni_relation - 2; goto section 3
    [Say nothing]      -> set Jia_relation - 1; set Eleni_relation - 1; goto section 4
    ***`,
  "2": `
    “Why do you always have to ruin the fun?” I retort, glaring back at Jia. She glares at me one more time before storming back to the tents. Eleni smirks and saunters up to me. “I’m impressed, I thought you were more of a pushover than that.” She retrieves her knife from the tree and places it in one of her many sheathes. “I mean, you let me hurl a knife at your head.” She laughs again at the thought. “I knew you wouldn’t hit me,” I lie. Frankly, it was terrifying, but it was way too cool of an opportunity to miss. “Sure you did,” she smirks again, seeing right through me. “Well, I’m gonna go practice where I won’t bother miss ‘lets not kill each other!’” She walks off into the trees and I go in the opposite direction back towards the tents. I walk by myslef to sit down by the small but warm fire.

    ***
    [The End] -> goto section 2
    [Begining] -> set Jia_relation = 0; set Eleni_relation = 0; goto section 0
    ***`,
  "3": `
    “You’re right, we shouldn’t have been messing around.” I apologize sincerely. Jia’s features soften and she uncrosses her arms. “Well, it’s not really that big of a deal.” I see Eleni roll her eyes before she retrieves her knife from the tree, which once again slides uncomfortably close to my ear. “Whatever. You might be a push over, but i’m not sorry for not doing anything wrong.” She walks past us both into the trees, probably to go throw knives elsewhere. Jia sighs and gives me a small smile after Eleni disappears. 
    “Why did you let her do that anyways?” She asks me.
    I move away from the tree and shrug. “Honestly? It was too cool of an opportunity to pass up,” I explain.
    “What? To have sharp, deadly objects hurled at you?”
    “Exactly.” I grin.
    Jia punches me lightly on the arm, “Sure, if thats what you like.” I nod and we walk together back towards the tents. “Well, I’m off to grab some water for tonight.” She says before walking past the tents into another section of the forest. I walk by myself to sit down by the small but warm fire.

    ***
    [The End] -> goto section 3
    [Begining] -> set Jia_relation = 0; set Eleni_relation = 0; goto section 0
    ***`,
  "4": `
    I shrug and move away from the tree. I don’t care what either of them think. I walk away from them both, leaving them to argue and eventually both storm off in separate directions. Jia walks toward the creek nearby, probably to collect water. Eleni walks in the opposite direction, likely to continue her knife throwing. I walk by myself to sit down by the small but warm fire.

    ***
    [The End] -> goto section 4
    [Begining] -> set Jia_relation = 0; set Eleni_relation = 0; goto section 0
    ***`,
};

