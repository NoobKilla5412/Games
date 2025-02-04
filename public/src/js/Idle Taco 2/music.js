"use strict";
const music = {
    menu: {},
    minigames: {
        menu: [
            // @ts-ignore
            new Howl({
                src: ["assets/idleTaco2/minigames/music/menu1-Retro_Cassette__day_Dec_9_2022_1146_AM.mp3"],
                loop: false,
                onend() {
                    loadMusic("minigames.menu");
                }
            })
        ]
    },
    load: {
        // @ts-ignore
        noobKillaStudios: new Howl({
            src: ["https://games.mechnosense.org/sound/Noob%20Killa%20Studios.wav"],
            loop: false
        })
    }
};
