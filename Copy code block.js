// Trilium Notes Copy Code Block Widget
// check for updates:
// https://github.com/Nriver/copy-code-block-widget/releases

const i18n = key => translations.trans[config.lang][key];

class countDownWidget extends api.NoteContextAwareWidget {
    get position() {
        return 100;
    }
    get parentWidget() {
        return 'center-pane';
    }

    isEnabled() {
        return super.isEnabled();
    }
    
    doRender() {
        this.$widget = $(``);
        return this.$widget;
    }

    async refreshWithNote(note) {
        // only execute in text note
        if (note.type !== 'text') {
            return;
        }
        
        $(document).ready(function () {           
            var container = $("div.note-split:not(.hidden-ext) > div.scrolling-container > div.note-detail");
            
            function performOperationWhenReady(container) {
                // Pinpoint code blocks
                container.find("pre:not(.CodeMirror-line, .CodeMirror-line-like)").each(function() {
                    var _this = $(this)[0];
                    
                    // Copy on double click
                    $(this).off('dblclick').on('dblclick', function() {
                        var codeContent = _this.innerText;
                        navigator.clipboard.writeText(codeContent);
                        api.showMessage(i18n('copied'));
                    });
                });

                // Pinpoint inline code elements (avoid those inside <pre>)
                container.find("code").not("pre code").each(function() {
                    var _this = $(this)[0];

                    // Copy on double click
                    $(this).off('dblclick').on('dblclick', function() {
                        var inlineCodeContent = _this.innerText;
                        navigator.clipboard.writeText(inlineCodeContent);
                        api.showMessage(i18n('copied'));
                    });
                });
            }

            // Wait for editor to load the content
            setTimeout(performOperationWhenReady, config.executeDelay, container);
        });
    }
}

module.exports = new countDownWidget();