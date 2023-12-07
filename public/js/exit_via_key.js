var iframe = document.getElementById('iframe')
iframe.onload = function() {
 iframe.contentWindow.addEventListener('keydown', function(event) {
   if (event.code == 'KeyR' && event.shiftKey) {
     window.location = '/games'
   }
 })
}
