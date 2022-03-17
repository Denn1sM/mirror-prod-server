

export const saveImage = async (imageDataUrl: string) => {
    fetch("/notes/save", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: new Date().toISOString(),
            image: imageDataUrl
        })}).then(res => {
            console.log(res)
    })
}