const fg = require('api-dylux');
const axios = require('axios');
const mime = require('mime-types');  // Make sure to install mime-types package
const cheerio = require('cheerio');
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const fs = require('fs-extra');
const config = require('../config')
const {
  cmd,
  commands
} = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, fetchApi} = require('../lib/functions')

cmd({
    pattern: "ginisisilas",	
    react: '🔎',
    category: "search",
    desc: "sinhalasub moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, q, isDev, reply }) => {
try{

 if ( !isDev ) return reply('⚠️ ⚠️ *Contact owner to Active your number To Premium user*')
        if(!q) return await reply('*please give me text !..*')
	const url = `https://ginisisilacartoon.net/search.php?q=${q}`
     const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    let result = [];
    $("#page_panels_ > table > tbody > tr > td > div").each((c, d) => {
        result.push({
             title: $(d).find("div.video-title").text(),
             date: $(d).find("div.posted-time").text(),
             image: $(d).find("a > img").attr("src"),
             link: $(d).find("a").attr("href"),

        })
    })
	
        if (result.length < 1) return await conn.sendMessage(from, { text: 'erro !' }, { quoted: mek } )
      let textw = `🔎 𝗧.𝗖 𝗠𝗢𝗜𝗩𝗘 𝗦𝗘𝗔𝗥𝗖𝗛 \n\n`;	
for (var i = 0; i < result.length; i++) {
  textw +=`*📎 Link:* ${result[i].title}\n`
  textw +=`*📎 Link:* ${result[i].date}\n\n--------------------------------------------\n\n
`
} 
        
return await conn.sendMessage(config.JID, { image: { url:result[0].image } , caption: textw } , { quoted: mek })
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply()
l(e)
}
})       


cmd({
    pattern: "ginisisila",	
    react: '📑',
    category: "search",
    desc: "sinhalasub moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, q, reply, prefix, isDev }) => {
try{
	if (!isDev) return await reply('*this command only use premium members* 👨‍💻')
	//if (!isGroup) return reply('🚫 *This is Group command*')
        if(!q) return await reply('*please give me text !..*')
	const url = `https://ginisisilacartoon.net/search.php?q=${q}`
     const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    let result = [];
    $("#page_panels_ > table > tbody > tr > td > div").each((c, d) => {
        result.push({
             title: $(d).find("div.video-title").text(),
             date: $(d).find("div.posted-time").text(),
             image: $(d).find("a > img").attr("src"),
             link: $(d).find("a").attr("href"),

        })
    })

	

        if (result.length < 1) return await conn.sendMessage(from, { text: `➥ No results to show with *${q}*` }, { quoted: mek } )
      	var rows = [];  
for (var i = 0; i < result.length; i++) {
	rows.push({
    
              header: "",
              title: result[i].title,
              description: result[i].date,
              id: `.ginidl ${result[i].link}`
            
          });
        }

let buttons = [{
          name: "single_select",
                    buttonParamsJson: JSON.stringify({
                        title: '𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 𝐂𝐀𝐑𝐓𝐎𝐎𝐍 🎬',
                        sections: [{
                            title: 'GINISISILACARTOON.NET',
                            highlight_label: 'TC-TEAM',
                            rows: rows
                    }]
               }),
          }
      ]
	let alls = ``
for (var i = 0; i < result.length; i++) {
    alls = `${result[i].title.length}`
}
	const x = '`'
	const xx = '```'
        const info = `_*TC TEAM CARTOON DL*_🎬\n\n
> ⏳ *Search A Moive Name:* ${x}${q}${x}\n
> 🫧 *SEARCH ALL MOIVE:* ${x}${alls}${x}\n
> 𝙼𝙾𝙸𝚅𝙴 𝙱𝚈 ${xx}ginisisilacartoon.net${xx}`
		
        let opts = {
                image: result[0].image,
                header: '',
                footer: '',
                body: info 

            }

return await conn.sendButtonMessage(from, buttons, m, opts)

} catch (e) {
            reply('*Error !!*')
            console.log(e)
            }
    })



cmd({
    pattern: "ginidl",	
    react: '📥',
    category: "search",
    desc: "sinhalasub moive downloader",
    filename: __filename
},
    async ( conn, mek, m, { reply, q, l, isDev, from, prefix }) => {
	    try {
		    const genurl = `https://ginisisilacartoon.net/${q}`
		    const response = await axios.get(genurl);
                    const $ = cheerio.load(response.data);
		    const download = $("#player-holder > div > iframe").attr("src");
		    const mtitle = $("#watch-contentHd").text();
		    
		    if (!isDev) return await reply('*this command only use premium members* 👨‍💻')
		    
		    const msg = `📃 𝗧.𝗖 𝗖𝗔𝗥𝗧𝗢𝗢𝗡 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥\n\n
📃 *Title:* ${mtitle}`

                let buttons = [{
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: 'Watch on ZOOM',
                        url: q,
                        merchant_url: q
                    }),
                },
                {
                    name: "quick_reply",
                    buttonParamsJson: JSON.stringify({
                        display_text: `CLICK TO DOWN CARTOON`,
                        id: `.gdrive ${download}`
                    }),
                }
                ]
                let message = {
                    image: '',
                    header: '🎬━_*T.C CARTOON DL*_━🎬',
                    footer: 'MOVIE DOWNLOADER BY TC',
                    body: msg

                }
                return conn.sendButtonMessage(from, buttons, m, message)

	    } catch (e) {
		    console.log(e)
		    reply('➥' + e)

	    }
    })
