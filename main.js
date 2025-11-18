console.log('Lets write JS')



const getSongs = async () => {
   let a = await fetch('http://127.0.0.1:3000/songs/')
    const response = await a.text(); 
    // console.log(response)
    let div = document.createElement("div")
    div.innerHTML=response
    let as = div.getElementsByTagName("a")
    let songs=[]
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href)
        }
        
    }
    return songs
    
    
}

const main = async () => {
    console.log(await getSongs())
}
main()



