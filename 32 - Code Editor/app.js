function displayResult() {
    try {
        const codeHTML = document.getElementById("html").value;
        const codeCSS = document.getElementById("css").value;
        const codeJS = document.getElementById("js").value;
        const resultEl = document.getElementById("result");
        
        const content = `
            <!DOCTYPE html>
            <html>
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500&display=swap" rel="stylesheet">
                <style>
                    * {
                        font-family: 'Kanit', sans-serif;
                    }
                    ${codeCSS}
                </style>
            </head>
            <body>
                ${codeHTML}
                <script>${codeJS}<\/script>
            </body>
            </html>
        `;
        
        // Set iframe content
        resultEl.contentDocument.open();
        resultEl.contentDocument.write(content);
        resultEl.contentDocument.close();
        
    } catch (error) {
        console.error('Error executing code:', error);
        alert('An error occurred while executing the code. Check console for details.');
    }
}

// Auto-resize textareas
document.querySelectorAll('textarea').forEach(textarea => {
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
});