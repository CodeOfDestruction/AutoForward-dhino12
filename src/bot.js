const { createConversation } = require("@grammyjs/conversations");
const { bot, grammy } = require("../server");
// const { signIn, sendCode, authImportSession } = require("./handler/auth");
const { signInUser } = require("./middlewares");
// require('./handler/auth')
let userInfo = null // <= information about phone_code, phone_number

bot.command('start', async (context) => {
    const inlineKeyboard = new grammy.InlineKeyboard()
    inlineKeyboard.text('Koneksi Pertama', 'firstconnection')
    inlineKeyboard.text('Dokumentasi / Bantuan', 'documentation')
    console.log(context.chat.id);
    await bot.api.sendMessage(context.chat.id, `
        Halo Selamat Datang, ${context.chat.first_name || context.chat.username} 👋.\nini adalah bot forward yang akan membantu kamu untuk meneruskan pesan ke lebih dari 1 chat group / channel, \ngunakan perintah /menu untuk melihat menu
    `, {  
        reply_markup: inlineKeyboard
    })

    context.session.name = 'John Doe';
    context.session.age = 30;
    // await getDialogs()
    // Send welcome message
    await context.reply(`Hello, ${context.session.name}!`);
})

bot.command('menu', async (context) => {
    const inlineKeyboard = new grammy.InlineKeyboard()
    inlineKeyboard.text('Koneksi Pertama', 'firstconnection')
    inlineKeyboard.text('Dokumentasi / Bantuan', 'documentation')

    await bot.api.sendMessage(context.chat.id, `Berikut adalah menu yang tersedia:`, {
        reply_markup: {
            inline_keyboard: [[
                {
                    text: 'Koneksi Pertama',
                    callback_data: 'firstconnection'
                },{
                    text: 'Dokumentasi / Bantuan',
                    callback_data: 'documentation'
                }
            ]],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
})

bot.command('connect', async (context) => {
    const item = context.match
    
    await context.conversation.enter('login')
    if (item.startsWith('+')) {
        // await client.connect()
        // const data = await client.sendCode({
        //     apiHash: 'd7484191ce14a0ab151857143e11701f',
        //     apiId: 20450718
        // }, item)

        // console.log(data);
    }
})

// bot.on('message:text', async (context) => {
    // const item = context.match
    // const data = await context.getChat()
    // console.log(data);

    // const data = client.signInUser({
    //     apiId: 20450718,
    //     apiHash: 'd7484191ce14a0ab151857143e11701f',
    // }, {
    //     phoneNumber: '+6289526075275',
    //     phoneCode: item || true,
    //     onError: (error) => console.log(error)
    // })

    // console.log(client.session.save());
// })

// bot.on('message::')
// bot.command('mycode', async (context) => {

//     console.log('mycode');
//     const item = context.match
//     const result = await signIn(item, userInfo)
//     console.log(result)
//     await context.reply(`Selamat Berhasil autentikasi: ${item}`)
// })


bot.on('msg', async (ctx) => {
    // console.log(ctx.chat.username);
    // const chatMember = await ctx.chatMembers.getChatMember();

    
    // return ctx.reply(
    //     `Hello, ${chatMember.user.first_name}! I see you are a ${chatMember.status} of this chat!`,
    // );
})

bot.hears('/hi', async (ctx) => {
    await bot.api.sendMessage(ctx.chat.id, 'Hello 👋')
})