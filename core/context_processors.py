def global_context(request):
    from .models import SiteConfiguration
    return {'site_config': SiteConfiguration.get_config()}
