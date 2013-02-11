<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>ЦУП</title>
        <style>
            body {
                font-family: Verdana;
                font-size: 14px;
            }
            #tabs li{
                display: inline;
                background-color: bisque;
                margin: 10px;
                padding: 2px 8px;
                border-radius: 4px;
            }
            #tabs li:hover, #tabs .selected {
                background-color: #f2c4c4;
            }
        </style>

    </head>
    <body>
        <div id="app">
            <div id="tabs">Табы: </div>
            <div id="sites">Сайты: </div>
            <div id="statistics">Всего сайтов: <span id="total">0</span></div>
        </div>

        <script type="text/template" id="template-tab">           
        </script>

        <script type="text/template" id="template-library">
            <h1><%= name %></h1>
            <ul class="sites"></ul>
        </script>

        <script type="text/template" id="template-site">
            <div class='site_entity'>
                <strong><%= id %></strong>
                <span><%= domain %></span>
            </div>
        </script>

        <script type="text/javascript" src="./js/lib/jquery.min.js"></script>
        <script type="text/javascript" src="./js/lib/underscore.min.js"></script>
        <script type="text/javascript" src="./js/lib/backbone.min.js"></script>  
        <script type="text/javascript" src="./js/app.js"></script>
        <script type="text/javascript" src="./js/models.js"></script>

        <script type="text/javascript">
            $(function() {
                //  sites = new Sites;
                //  sites.fetch();
                //  view = new LibraryView({collection: sites});

                app = new App;


            });

        </script>

    </body>
</html>
