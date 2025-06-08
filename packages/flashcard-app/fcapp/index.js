/**
 * DigitalOcean Function: Serves vocab JSON and static files for Flashcard App
 */

const fs = require('fs');
const path = require('path');

const vocab = [
  { word: 'consternation', meaning: 'a feeling of anxiety or dismay, typically at something unexpected', meaning_mm: 'စိတ်လှုပ်ရှားမှု၊ စိုးရိမ်မှု', meaning_jp: '驚愕、動揺', examples: [
    'She felt consternation at the sudden news.',
    'There was consternation among the staff when the project was canceled.'
  ] },
  { word: 'lethargy', meaning: 'a lack of energy and enthusiasm', meaning_mm: 'စွမ်းအားနည်းခြင်း၊ စိတ်မပါခြင်း', meaning_jp: '無気力、倦怠', examples: [
    'A feeling of lethargy overcame him after lunch.',
    'The hot weather induced a state of lethargy.'
  ] },
  { word: 'propagation', meaning: 'the act of spreading or multiplying', meaning_mm: 'ပြန့်ပွားခြင်း', meaning_jp: '伝播、拡散', examples: [
    'The propagation of the rumor was rapid.',
    'Plant propagation can be done by seeds or cuttings.'
  ] },
  { word: 'disseminate', meaning: 'to spread or disperse information widely', meaning_mm: 'ဖြန့်ဝေသည်', meaning_jp: '広める、普及させる', examples: [
    'It is important to disseminate accurate information.',
    'The organization works to disseminate health education.'
  ] },
  { word: 'uptick', meaning: 'a small increase or rise', meaning_mm: 'အနည်းငယ်တက်လာခြင်း', meaning_jp: 'わずかな増加', examples: [
    'There has been an uptick in sales this month.',
    'The company reported an uptick in profits.'
  ] },
  { word: 'robust', meaning: 'strong and healthy; vigorous', meaning_mm: 'အားကောင်းသော၊ ကျန်းမာသော', meaning_jp: '頑健な、たくましい', examples: [
    'She has a robust constitution.',
    'The system is robust and reliable.'
  ] },
  { word: 'tedious', meaning: 'too long, slow, or dull; tiresome or monotonous', meaning_mm: 'ပျင်းစရာကောင်းသော', meaning_jp: '退屈な、単調な', examples: [
    'Filling out forms can be a tedious task.',
    'The work was tedious and repetitive.'
  ] },
  { word: 'pariah', meaning: 'an outcast', meaning_mm: 'လူမဆန္ဒရှိသူ', meaning_jp: 'のけ者、追放者', examples: [
    'He became a pariah in his own community.',
    'The whistleblower was treated as a pariah.'
  ] },
  { word: 'sweltering', meaning: 'uncomfortably hot', meaning_mm: 'အလွန်ပူသော', meaning_jp: 'うだるように暑い', examples: [
    'It was a sweltering summer day.',
    'The sweltering heat made it hard to work.'
  ] },
  { word: 'wary', meaning: 'feeling or showing caution about possible dangers or problems', meaning_mm: 'သတိထားသော', meaning_jp: '用心深い、警戒している', examples: [
    'She was wary of strangers.',
    'Investors are wary of the new regulations.'
  ] },
  { word: 'instigate', meaning: 'to provoke or incite to action', meaning_mm: 'လှုံ့ဆော်သည်၊ အားပေးသည်', meaning_jp: '扇動する、引き起こす', examples: [
    'They instigated a protest.',
    'He was accused of instigating violence.'
  ] },
  { word: 'pursue', meaning: 'to follow or chase with the intent to catch or achieve', meaning_mm: 'လိုက်လံသည်၊ ဆက်လက်လုပ်ဆောင်သည်', meaning_jp: '追求する、追いかける', examples: [
    'She decided to pursue a career in medicine.',
    'The police pursued the suspect.'
  ] },
  { word: 'blindsided', meaning: 'to be taken by surprise, especially in a negative way', meaning_mm: 'မမျှော်လင့်ဘဲ ထိခိုက်သည်', meaning_jp: '不意を突かれる', examples: [
    'He was blindsided by the sudden announcement.',
    'The company was blindsided by the lawsuit.'
  ] },
  { word: 'ardent', meaning: 'enthusiastic or passionate', meaning_mm: 'စိတ်အားထက်သန်သော', meaning_jp: '熱心な、情熱的な', examples: [
    'She is an ardent supporter of the arts.',
    'He spoke with ardent enthusiasm.'
  ] },
  { word: 'proponent', meaning: 'a person who advocates for or supports something', meaning_mm: 'ထောက်ခံသူ', meaning_jp: '支持者、提唱者', examples: [
    'He is a proponent of renewable energy.',
    'She was a leading proponent of the reform.'
  ] },
  { word: 'fledgling', meaning: 'new and inexperienced', meaning_mm: 'အသစ်တက်သော၊ အတွေ့အကြုံနည်းသော', meaning_jp: '駆け出しの、未熟な', examples: [
    'The fledgling company is growing fast.',
    'He is a fledgling writer.'
  ] },
  { word: 'slew', meaning: 'a large number or quantity of something', meaning_mm: 'အရေအတွက်များသော', meaning_jp: '多数、大量', examples: [
    'There are a slew of new apps on the market.',
    'She received a slew of messages.'
  ] },
  { word: 'renege', meaning: 'to go back on a promise, agreement, or commitment', meaning_mm: 'ကတိမပြည့်မီခြင်း', meaning_jp: '約束を破る', examples: [
    'He reneged on his promise.',
    'The company reneged on the contract.'
  ] },
  { word: 'unfathomable', meaning: 'difficult or impossible to understand', meaning_mm: 'နားလည်ရခက်သော', meaning_jp: '計り知れない、理解しがたい', examples: [
    'The universe is unfathomable.',
    'Her motives were unfathomable.'
  ] },
  { word: 'slash', meaning: 'to cut with a sweeping or striking motion', meaning_mm: 'ဖြတ်တောက်သည်', meaning_jp: '切り裂く', examples: [
    'He slashed the prices.',
    'The tires were slashed.'
  ] }
];

const staticFiles = {
  '/': { file: 'index.html', type: 'text/html' },
  '/index.html': { file: 'index.html', type: 'text/html' },
  '/app.js': { file: 'app.js', type: 'application/javascript' },
  '/style.css': { file: 'style.css', type: 'text/css' }
};

exports.main = async (event, context) => {
  console.log('Function invoked:', JSON.stringify({ path: event.path, method: event.httpMethod, headers: event.headers }));
  // Log incoming event for debugging
  console.log('Incoming event.path:', event.path);
  // Normalize path to handle trailing slashes and subpaths
  let reqPath = event.path || '/';
  // Remove any base path (e.g., /api/v1/web/flashcard-app/fcapp)
  reqPath = reqPath.replace(/.*\/fcapp/, '') || '/';
  console.log('Normalized reqPath:', reqPath);
  if (reqPath === '' || reqPath === '/') reqPath = '/';
  if (reqPath === '/vocab') {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(vocab)
    };
  }
  if (staticFiles[reqPath]) {
    const filePath = path.join(__dirname, staticFiles[reqPath].file);
    try {
      const content = fs.readFileSync(filePath);
      return {
        statusCode: 200,
        headers: { 'Content-Type': staticFiles[reqPath].type },
        body: content.toString(staticFiles[reqPath].type === 'text/html' ? 'utf8' : undefined),
        isBase64Encoded: false
      };
    } catch (e) {
      return { statusCode: 404, body: 'Not found' };
    }
  }
  return { statusCode: 404, body: 'Not found' };
};
