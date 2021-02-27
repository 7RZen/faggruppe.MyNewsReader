using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using oh7.MyNewsFeedReader.Library;
using oh7.MyNewsFeedReader.Models;

namespace faggruppe.MyNewsReader.WebApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NewsStoreController : ControllerBase
    {
        private readonly ILogger<NewsStoreController> _logger;
        private readonly StoreSettings _storeSettings;

        public List<NewsOutlet> NewsOutlets { get; set; }
        public List<Article> Articles { get; set; }

        public NewsStoreController(ILogger<NewsStoreController> logger, IOptions<StoreSettings> options)
        {
            _logger = logger;
            _storeSettings = options.Value;

            if (string.IsNullOrWhiteSpace(_storeSettings.StorePath))
            {
                _storeSettings.StorePath = StoreHelper.DefaultStorePath.FullName;
            }

            NewsOutlets = new List<NewsOutlet>();
            Articles = new List<Article>();
        }

        [HttpGet]
        public IEnumerable<Article> Get(string outlet)
        {
            if (string.IsNullOrWhiteSpace(outlet)) outlet = "vg";

            try
            {
                var newsOutletFactory = new NewsOutletFactory(_storeSettings);
                var articleFactory = new ArticleFactory(_storeSettings);
                var newsOutlet = newsOutletFactory
                    .Load(new NewsOutlet { Disabled = false })
                    .FirstOrDefault(x => x.Tag.Equals(outlet, StringComparison.InvariantCultureIgnoreCase));

                return articleFactory
                    .Load(new List<NewsOutlet> { newsOutlet })
                    .SelectMany(x => x.Articles)
                    .OrderByDescending(x => x.Date).ToArray();
            }
            catch (Exception e)
            {
                _logger.Log(LogLevel.Error, "Error retrieving articles!", e);
            }

            return new List<Article>();
        }
    }
}
