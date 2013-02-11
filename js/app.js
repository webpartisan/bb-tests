$(function() {



    window.Site = Backbone.Model.extend({});


    window.Sites = Backbone.Collection.extend({
        model: Site,
        initialize: function(data) {
            this.tabId = data.tabId;
        },
        url: function() {
            return './sites/' + this.tabId;
        }
    });

    window.SiteView = Backbone.View.extend({
        tagName: 'li',
        className: 'site',
        initialize: function() {
            _.bindAll(this, 'render');

            this.template = _.template($('#template-site').html());
        },
        render: function() {
            var renderedContent = this.template(this.model.toJSON());
            $(this.el).html(renderedContent);
            return this;
        }
    });
    window.LibrarySiteView = SiteView.extend({
    });

    window.LibraryView = Backbone.View.extend({
        tagName: 'div',
        className: 'library',
        initialize: function() {
            this.statistics = app.$("#statistics");
            this.template = _.template($('#template-library').html());
            this.collection.on('reset', this.render, this)
            this.collection.fetch();

        },
        render: function() {
            var $sites,
                    collection = this.collection;
            $('#sites').html($(this.el).html(this.template({})));
            $sites = this.$('.sites');
            collection.each(function(site) {
                var view = new LibrarySiteView({
                    model: site,
                    collection: collection
                });
                $sites.append(view.render().el);
            });
            this.statistics.find('#total').html(collection.length);

            return this;
        }


    });

    window.TabView = Backbone.View.extend({
        tagName: 'li',
        events: {
            "click": "select"
        },
        initialize: function() {
            // console.log(this);
            this.template = _.template($('#template-tab').html());
            this.listenTo(this.model, "change:selected", this.changeSelected);
        },
        render: function() {

            this.$el.html(this.model.get('name'));
            return this;
        },
        openTab: function() {
            var tabSites = new Sites({tabId: this.model.get('id')});
            new LibraryView({collection: tabSites});
        },
        select: function() {
            this.model.collection.each(function(model) {
                model.set({'selected': false})
            });
            this.model.set({'selected': true})
        },
        changeSelected: function() {
            if (this.model.get('selected')) {
                this.$el.addClass('selected');
                this.openTab();
            } else {
                this.$el.removeClass('selected');
            }
        }
    });
    window.Tab = Backbone.Model.extend({
        initialize: function() {
        }
    });

    window.Tabs = Backbone.Collection.extend({
        url: './tabs',
        model: Tab,
        initialize: function() {

        }
    });


    window.App = Backbone.View.extend({
        el: $('#app'),
        initialize: function() {
            this.tabs = new Tabs;
            this.tabs.fetch();
            this.tabs.on('add', this.addOne, this);
            this.tabs.on('reset', this.addAll, this);
            this.tabs.on('reset', this.render, this)
        },
        render: function() {
            this.tabs.at(0).set({'selected': true});
            return this;
        },
        addOne: function(tabModel) {
            var view = new TabView({model: tabModel});
            this.$("#tabs").append(view.render().el);
        },
        addAll: function() {
            this.tabs.each(this.addOne);
        }
    });


});