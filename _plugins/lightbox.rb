module Jekyll
  class LightboxTag < Liquid::Tag
    def initialize(tag, opts, tokens)
      super
      defaults = {name: 'lightbox', url: '', title: ''}
      options = defaults.merge(eval(opts))
      @lightbox_name = options[:name]
      @url = options[:url]
      @title = options[:title]
    end

    def render(context)
      <<-HTML
<a href="#{@url}" data-lightbox="#{@lightbox_name}" data-title="#{@title}">
  <img src="#{@url}" width="100%" />
</a>
      HTML
    end
  end
end
Liquid::Template.register_tag('lightbox', Jekyll::LightboxTag)
