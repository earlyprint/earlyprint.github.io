
function setSocialMediaLinks() {
    
    $("#twitterA").attr("href", "https://twitter.com/intent/tweet?original_referer=" + document.location.href + "&text=from earlyprint.wustl.edu&url=" + document.location.href);
    
    $("#emailA").attr("href", "mailto:email@email.com?subject=from earlyprint.wustl.edu&body=" + document.location.href);
}
