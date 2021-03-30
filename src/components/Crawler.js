const axios = require('axios');
// const fs = require('fs');

const Crawler = ({ site }) => {

  const crawl = () => {
    axios.post('localhost:3003/')
      .then((response) => {

      })
      .catch((err) => {
        console.log('error: ', err);
      })
  };

  return (
    <div>
      <button onClick={ crawl }>Crawl</button>
    </div>
  )
}

export default Crawler;

// request(site, (error, response, body) => {
//   if (error) {
//     console.log('error: ', error);
//   }
//   console.log('Status code: ', response.statusCode);

//   // console.log('body: ', body);
//   var $ = cheerio.load(body);

//   $('div').each(( index ) => {
//     var $html = $(this).html();
//     console.log($html);
//   })
// })