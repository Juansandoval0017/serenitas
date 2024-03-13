'use server'

export async function getTranstaleText(text:string){

    try{
      const res = await fetch('https://api-free.deepl.com/v2/translate',{
        method: 'POST',
        headers: {'Authorization': `DeepL-Auth-Key ${process.env.TRANSLATE_API}`,
        'Content-Type': 'application/json'},
        body: JSON.stringify({
            'text': [text],
            'target_lang': 'EN'
            })
    },)

        const data = await res.json()


        return data.translations[0].text
    }

    catch(e){
        return ""
    }

}