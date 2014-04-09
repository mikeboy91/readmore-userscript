function ForumNavigation(_options, _reloadPageData) {
    var _self = this;

    this.initializeForum = function () {
        var html = '';
        var sortForum = [ _options.getOption('rightColumn_forum_hideForum_0'),
            _options.getOption('rightColumn_forum_hideForum_1'),
            _options.getOption('rightColumn_forum_hideForum_2'),
            _options.getOption('rightColumn_forum_hideForum_3'),
            _options.getOption('rightColumn_forum_hideForum_4')];
        var menuItems = document.getElementsByClassName('cont_box')[1].children;
        var sections = ['', '', '', '', ''];

        // Alle Menueinträge durchgehen
        for (var j = 0, k = menuItems.length, l = -1, item = ''; j < k; j++) {
            // HTML-Auslesen
            item = menuItems[j].outerHTML;
            // Sektionen hochzählen
            if (item.indexOf('class="bml"') !== -1)    l++;
            // Bilder in der "Featured Thread" Sektion anpassen
            if (l === 0) item = item.replace('" height="11px"', '" height="11px" class="userscript11px" ');
            // Eintrag zur Sektion hinzufügen
            sections[l] += item;
        }

        // Leerzeilen entfernen
        for (var n = 0, o = sections.length; n < o; n++) {
            sections[n] = sections[n].replace(/(<div class="spacer_s"><\/div>)|(<br>)|(<br \/>)/g, '');
        }

        // Keine Featured Threads vorhanden -> rauswerfen
        if (sections[4] === '') {
            var sectionsNew = [''];
            for (var i = 0, m = sections.length; i < m; i++) {
                if (sections[i] !== '') {
                    sectionsNew.push(sections[i]);
                }
            }
            sections = sectionsNew;
        }

        // Reihenfolge der Sektionen entsprechen den Optionen anpassen
        for (var i = 0, m = sections.length; i < m; i++) {
            switch (sortForum[i]) {
                case 'featuredthreads':
                    html += sections[0] + '<br>';
                    break;
                case 'esportforen':
                    html += sections[1] + '<br>';
                    break;
                case 'technik':
                    html += sections[2] + '<br>';
                    break;
                case 'offtopicforen':
                    html += sections[3] + '<br>';
                    break;
                case 'spiele':
                    html += sections[4] + '<br>';
                    break;
            }
        }

        // Noch einmal prüfen ob Leerzeilen vorhanden sind, nötig wegen dem Featured Thread fix
        html = html.replace(/(<br>|<br \/>)+/gi, '<br>');

        // Einfügen
        document.getElementsByClassName('cont_box')[1].innerHTML = html;

        // Größe der Bilder anpassen
        $('.userscript11px').css('height', '11px').css('width', '11px');
    };

    this.reloadForum = function () {
        var reloadData = $(_reloadPageData.getPageData()).find('div.cont_box:last').html();

        if (reloadData && reloadData.length > 0) {
            $('.cont_box:last').html(reloadData);
            if (_options.getOption('rightColumn_forum_sections') == 'checked') {
                _self.initializeForum();
            }
        }
    };

    this.reloadForumPerClickAddImage = function () {
        $('a.headline_link[href="index.php?cont=forum/forum"]').parent().append('<span style="float: right;"><img id="userscript_reloadForumButton" src="http://readmore.thextor.de/userscript/img/refresh.png" style="height: 13px; padding-top: 2px; cursor: pointer;">&nbsp;</span>');
    };

    this.reloadForumPerClickDoReload = function () {
        _reloadPageData.readPage();
        window.setTimeout(function () {
            _self.reloadForum();
        }, 1500);
    };

    this.hideForum = function () {
        $('div.headline_bg:last, div.cont_box:last').css('display', 'none');
    };
}