const data = {"Title":`#[center]Assassinating the Elven King
@[center]by Aurora Borden

[CHOICES]
Continue -> goto Page 1
`,"Page 1":`[CHECKPOINT]
#Chapter 1

I hear something fly past my head and land with a thud disturbingly close to my ear. Laughter erupts from in front of me and I open my eyes to see the moon elf doubled over and pointing at me. “You should have seen your face!” she managed to gasp out. 
“Could we perhaps not kill each other before our mission even starts?” A voice called from the tents set up a short distance away from us. Jia, the other half elf besides myself is striding towards us, an annoyed look on her face.
“Oh relax, Jia,” replies Eleni, the moon elf. “I was just getting in some target practice.” She sneers with a glint in her eyes that would send more sane people running.
Jia simply crosses her arms and turns her disapproving glare to me. “I expected this from her, honestly... But you too, Vargon?” 

[CHOICES]
Agree with Eleni -> set Eleni_relation + 2; set Jia_relation + 2; goto Page 2_1 # improve relation w/ Eleni, decrease w/ Jia

Apologize -> set Jia_relation + 2; set Eleni_relation - 2; goto Page 2_2 # improve relation w/ Jia, decrease w/ Eleni

Say nothing -> set Jia_relation - 1; set Eleni_relation - 1; goto Page 2_3 # slightly decrease relation w/ both

`,"Page 2_1":`[CHECKPOINT]
“Why do you always have to ruin the fun?” I retort, glaring back at Jia. She glares at me one more time before storming back to the tents.
Eleni smirks and saunters up to me. “I’m impressed, I thought you were more of a pushover than that.” She retrieves her knife from the tree and places it in one of her many sheathes. “I mean, you let me hurl a knife at your head.” She laughs again at the thought.
“I knew you wouldn’t hit me,” I lie. Frankly, it was terrifying, but it was way too cool of an opportunity to miss.
“Sure you did.” She smirks again, seeing right through me. “Well, I’m gonna go practice where I won’t bother miss ‘lets not kill each other!’” She walks off into the trees and I go in the opposite direction back towards the tents. I walk by myself to sit down by the small but warm fire. 

[CHOICES]
Continue -> goto Page 3
`,"Page 2_2":`[CHECKPOINT]
“You’re right, we shouldn’t have been messing around.” I apologize sincerely.
Jia’s features soften and she uncrosses her arms. “Well, it’s not really that big of a deal.”
I see Eleni roll her eyes before she retrieves her knife from the tree, which once again slides uncomfortably close to my ear. “Whatever. You might be a pushover, but I’m not sorry for not doing anything wrong.” She walks past us both into the trees, probably to go throw knives elsewhere. 
Jia sighs and gives me a small smile after Eleni disappears. “Why did you let her do that anyways?” she asks me.
    I move away from the tree and shrug. “Honestly? It was too cool of an opportunity to pass up,” I explain.
    “What? To have sharp, deadly objects hurled at you?”
“Exactly.” I grin.
    Jia punches me lightly on the arm. “Sure, if that's what you like.” I nod and we walk together back towards the tents. “Well, I’m off to grab some water for tonight.” She says before walking past the tents into another section of the forest. I walk by myself to sit down by the small but warm fire. 

[CHOICES]
Continue -> goto Page 3
`,"Page 2_3":`[CHECKPOINT]
I shrug and move away from the tree. I don’t care what either of them think. I walk away from them both, leaving them to argue and eventually both storm off in separate directions. Jia walks toward the creek nearby, probably to collect water. Eleni walks in the opposite direction, likely to continue her knife throwing. I walk by myself to sit down by the small but warm fire. 

[CHOICES]
Continue -> goto Page 3
`,"Page 3":`[CHECKPOINT]
I sense someone walk up behind me and twist around to look at him. Petren, our senior assassin, nods once before taking a seat across from me. Petren had been the one who volunteered and put together the team for our mission. We were all members of the Assassins Guild, which I think is a pretty self-explanatory name.
Anyways, our mission was given to us just a few days ago and we were all chosen by Petren, who was basically a living legend among assassins. He was a battle-axe wielder as well as an archer, great for both up close and long distance combat. Jia was chosen because she was the most powerful firebender we had, and she was a great strategist. Eleni was also one of the best in the guild, she took and filled assassination contracts faster than most of the seniors. I think it was probably because she was just a little bit insane, but she gets stuff done so who am I to question it. As for me, well. It’s a bit embarrassing really, but this is my first mission. I’d done small contracts, sure. A beggar here, a lone hunter there, but never anything big and important. 
This is kind of like my big test. If I fail this, I’m out of the guild. And nobody can just leave the guild so they’d have to eliminate me. That’s why I was put on the team with the best of the best. Even if I didn’t perform super well, the rest of the team could easily pick up my slack. Not to say I planned on failing, but you never really know what might happen. There are always so many possibilities.
“Do you feel as though you’ve prepared yourself for what is to come?” Petren asks, interrupting my thoughts. It’s a great question. Our mission was to assassinate the Elven King in the city of Selasera, the biggest city of the world. Have I prepared myself for this? 


[CHOICES]
“Oh yeah, absolutely. No trouble at all.” -> set Petren_relation - 2; goto Page 4_1 # reduce relation
“I don’t know. I’m actually kinda nervous.” -> set Petren_relation + 2; goto Page 4_2 # increase relation

`,"Page 4_1":`[CHECKPOINT]
“Oh yeah, absolutely. No trouble at all,” I say, puffing my chest slightly. “Should be a piece of cake.” I meet Petrens’ eyes and see him looking at me disdainfully.
“You should not take this so lightly, boy.” he says firmly, “Must I remind you that this is your first mission and your job with us is on the line here?”
I clench my jaw and look away. It’s always hard to maintain eye contact with Petren, nevermind when he’s angry. “I understand,” I say briskly. It’s hard to be mad at such a notable assassin, but really, “boy”? I suppose I was like a child to him. He was over 200 and I was just over 30, but still. “I only meant I’m not nervous or anything.”
He grunts before replying, “There’s no need to act undaunted by our task. It is no small feat to murder a king.” 

[CHOICES]
Continue -> goto Page 5
`,"Page 4_2":`[CHECKPOINT]
“I don’t know. I’m actually kinda nervous.” I say truthfully. “I just hope I don’t screw it up.” I look up and am met with a look of something like sympathy in his eyes. “I would not have allowed you to come if I were concerned you would cause us to fail. No, I believe you can be a great asset to us.” I quickly look away to avoid his gaze for any longer. I hadn’t expected any kind of sympathy from Petren, much less praise. “That being said,” he continues, “if you can’t manage to toughen up, and your unreadiness becomes an issue, I will not allow you to be what holds us back.”
“I understand,” I say with a lump in my throat. At least I know Petren is still as callus as ever. 

[CHOICES]
Continue -> goto Page 5
`,"Page 5":`[CHECKPOINT]
I stoke the fire for a minute, occasionally poking the wood with a stick. “So,” I ask as the silence becomes just too much, “do you have any idea how we’re going to get into the city?” I figured that as our senior, Petren would have had everything planned out - down to the last drop of blood being spilt.
The elf simply shrugged and looked past me into the trees. “We will discuss it over supper.” Right on cue, Jia emerges from where Petren was looking, carrying four flasks and a metal pot all full of water. She gives us her signature look of disapproval, before setting the pot next to the fire and chucking the flasks into each of our tents. “You two haven’t even started on the food yet?” Petren and I share a look as Jia starts preparing everything to cook. “Don’t just sit there watching me, get up and help.” She demands. 
A little over an hour later, 

`,};