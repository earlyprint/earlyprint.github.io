
	/**
	 * 
	 */
	function onShortenLink() {
        
        var url = decodeURIComponent(window.location.toString());
        
        var url_bits = url.split('?');
        
        var fixed_url = url_bits[0] + '?' + encodeURIComponent(encodeURI(url_bits[1]))
        
        $.get('https://earlyprint.wustl.edu/url/index.php?l=' + fixed_url, 
            function(short_url) {
                
                const el = document.createElement('textarea');
                el.value = short_url;
                document.body.appendChild(el);
                el.select();
                document.execCommand('copy');
                document.body.removeChild(el);

                alert('Shareable link ' + short_url + ' copied to clipboard.');
            }
        );
	}
