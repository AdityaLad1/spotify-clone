
const getSongs = async (params) => {
    
    let a = await fetch('http://127.0.0.1:3000/songs/')
    const data = await a.text(); 
    return data
}

const main = async () => {
    let songs = await getSongs()
    console.log(songs)
    
}
main()
