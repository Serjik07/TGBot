const { Telegraf } = require('telegraf');
const express = require('express');
const app = express();

const bot = new Telegraf('5877503543:AAGLb8WYJw2yT1zjon0a3DD4YVFsmmmlsJI');
bot.start((ctx) => {
    if(ctx.update.message) {
        // console.log(ctx.update.message.text);
        const firsNameUser = ctx.update.message.chat.first_name;
        ctx.reply(`Բարև✋ ${firsNameUser}`);
        //ctx.reply(`Ինչպե՞ս ես ${firsNameUser}`);
    
        //ask();
    }
});
bot.hears('/game', (ctx) => {
    ctx.reply("Ես 0-100 միջավայրում թիվ եմ մտապահել դու պետք է գուշակես այն"); 
            //real ask Ես 0-10 միջավայրում թիվ եմ մտապահել դու ունես 3 փորձ գուշակելու համար
    let userNum = game();
    let f = 0;
    for (let k = 0; k < 3; k++) {
        bot.on('message',(ctx) => {
                if(ctx.update.message.text < userNum) {
                    ctx.reply("մտապահված թիվն ավելի մեծ է");
                    f++;
                } else if(ctx.update.message.text > userNum) {
                    ctx.reply("մտապահված թիվն ավելի փոքր է");
                    f++;
                } else if(ctx.update.message.text == userNum) {
                    ctx.reply("Ճիշտ է,դու հաղթեցիր");
                    userNum = game();
                    ctx.reply("Ես Նորից 0-100 միջավայրում թիվ եմ մտապահել դու պետք է գուշակես այն");
                } else {
                    ctx.reply("Սխալ։ Այ ճիվաղ նոռմալ բան գրի կամե խաղա");
                    f++;
                }
            })
        if(f == 8) {
            break;
        }
    }
})

// function ask() {
//     return bot.on("message", (ctx) => {
//         if (ctx.update.message.text == "Լավ") {
//             ctx.reply("լավա");
//             return;
//         } else {
//             ctx.reply("այս հրամանը bot-ը դեռ չի հասյանում");
//             return;
//         }
//     })
// }

function game() {
    let num = Math.floor(Math.random() * 100);
    console.log(num);
    return num;
}
bot.help((ctx) => ctx.reply('Հրամաններից պատրաստ է միայն՝'));
// bot.on("Խաղալ", (ctx) => {
//     let number = Math.floor(Math.random() * 11);

// })
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));