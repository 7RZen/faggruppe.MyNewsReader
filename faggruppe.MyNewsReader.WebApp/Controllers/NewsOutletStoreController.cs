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
    public class NewsOutletStoreController : ControllerBase
    {
        private readonly ILogger<NewsOutletStoreController> _logger;
        private readonly StoreSettings _storeSettings;

        public NewsOutletStoreController(ILogger<NewsOutletStoreController> logger, IOptions<StoreSettings> options)
        {
            _logger = logger;
            _storeSettings = options.Value;

            if (string.IsNullOrWhiteSpace(_storeSettings.StorePath))
                _storeSettings.StorePath = StoreHelper.DefaultStorePath.FullName;

            NewsOutlets = new List<NewsOutlet>();
            Articles = new List<Article>();
        }

        public List<NewsOutlet> NewsOutlets { get; set; }
        public List<Article> Articles { get; set; }

        [HttpGet]
        public IEnumerable<NewsOutlet> Get()
        {
            try
            {
                var newsOutletFactory = new NewsOutletFactory(_storeSettings);
                var newsOutlet = newsOutletFactory
                    .Load(new NewsOutlet {Disabled = false});

                return newsOutlet.OrderByDescending(x => x.Name).ToArray();
            }
            catch (Exception e)
            {
                _logger.Log(LogLevel.Error, "Error retrieving news outlets!", e);
            }

            return new List<NewsOutlet>();
        }
    }
}