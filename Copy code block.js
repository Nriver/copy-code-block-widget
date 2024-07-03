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
                // pinpoint code blocks
                container.find("pre:not(.CodeMirror-line, .CodeMirror-line-like)").each(function() {
            
                    var _this = $(this)[0];
                    
                    // copy on double click
                    // unbind first, prevent duplicated event binding
                    $(this).off('dblclick').on('dblclick', function() {
                        // extract code block data
                        var codeContent = _this.innerText;
                        navigator.clipboard.writeText(codeContent);
                        api.showMessage(i18n('copied'));
                    });
                });
            }
            // wait for editor load the content, prevent unexpected things
            setTimeout(performOperationWhenReady, config.executeDelay, container);
        });
    }
}

module.exports = new countDownWidget();