define([
    'providers',
    'jquery',
    config.guiJs('livedesk', 'providers/prepublish'),
    'jquery/rest'
], function(providers, $, PrepublishView) {    
    
    $.extend(providers.soundcloud, {
        adaptor: {
            init: function() {
                var self = this;
                new $.rest('Data/Collaborator/')
                    .xfilter('Id')
                    .request({data: { 'qs.name': 'soundcloud'}})
                    .done(function(collabs) {
                        if($.isDefined(collabs[0])) 
                            self.author = collabs[0].Id;
                    });
            },
            universal: function(obj) {
                var meta =  jQuery.extend(true, {}, obj);
                delete meta['$idx'];
                delete meta['$len'];                
                return new PrepublishView({
                    sourceTemplate: 'sources/soundcloud',
                    data: {
                        Creator: localStorage.getItem('superdesk.login.id'),
                        Content: obj.title,
                        Type: 'normal',
                        Author: this.author,
                        Meta: meta
                    }
                });
            }
        }
    });
    return providers;
});