define('providers/instagram/tab', ['providers', 'providers/_utils', 'tmpl!livedesk>providers/instagram/post'], function(providers, utils) {	providers.instagram = {		className: 'big-icon-instagram',	                tooltip: _('Instagram'),		init: function() {							require(['providers','providers/instagram'], function(providers) {				providers.instagram.init();			});		},		// aop on timeline view		timeline: 		{		    init: function()		    {		        var self = this;		        // TODO move to set for cleanness		        $(this.el).on('click', '.btn.publish', function()		        {		            var data = {Content: self.model.get('Content'), Meta: self.model.get('Meta')};	                data.Meta = JSON.stringify(data.Meta);	                utils.MetaCheck.call(self, data.Meta) && 	                    (self.model.set(data).sync() && self.el.find('.actions').addClass('hide'));		        });		        $(this.el).on('click', '.btn.cancel', function()                {		            $('.actions', self.el).addClass('hide');                });		    },		    edit: function()		    {		        $('.actions', this.el).removeClass('hide');		    },		    save: function()		    {		        return false;		    },		    render: function(callback)	        {	            var self = this,	                feed = this.model.feed();	            	            try	            {	                feed.Meta = JSON.parse(feed.Meta);	            }	            catch(e)	            {	                eval('feed.Meta = '+feed.Meta);	            }	            $.tmpl('livedesk>providers/instagram/post', feed, function(e, o)                {                    self.setElement(o);                    $(self.el).off('click', '.btn.publish').on('click', '.btn.publish', function()                    {                        var data =                         {                            Content: self.model.get('Content'),                            Meta: JSON.stringify( $.extend( feed.Meta,                             {                                annotation: $('.instagram-full-content .annotation:eq(0)', self.el).html(),                            }))                        };                            utils.MetaCheck.call(self, data.Meta) &&                             (self.model.set(data).sync() && $('.actions', self.el).addClass('hide'));                    });                                        $(self.el).off('click', '.btn.cancel').on('click', '.btn.cancel', function()                    {                        $('.actions', self.el).addClass('hide');                    });                                        callback.call(self);                });	        }		}	};	return providers;});