export const downloadb64 = (b64 : string, fileName : string) => {
    const linkSource = b64;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
}