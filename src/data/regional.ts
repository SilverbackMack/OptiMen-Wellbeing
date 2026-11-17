// "In the US / In the UK" notes shown near the top of guides, and US and UK
// prices for reviews. The guides themselves cite a mix of US and UK sources;
// these notes cover what differs by country: who offers a check, what it costs,
// thresholds and units, and who to call.
//
// US guidance used here: US Preventive Services Task Force (USPSTF), CDC,
// American Heart Association (AHA), American Cancer Society (ACS), FDA and NIH.
// Checked November 2026. Review these when official guidance changes.

export interface RegionalNote {
  us: string[];
  uk: string[];
}

const US_CRISIS = 'Struggling right now? Call or text 988, the Suicide & Crisis Lifeline, any time. In an emergency, call 911.';
const UK_CRISIS = 'Struggling right now? Call Samaritans free on 116 123, any time, or NHS 111. In an emergency, call 999.';

export const REGIONAL: Record<string, RegionalNote> = {
  'nhs-health-check-at-40': {
    us: [
      'This guide covers the NHS Health Check, which only runs in England. There is no direct US equivalent.',
      'The closest thing is a yearly preventive visit. Most private plans and Medicare cover recommended screenings at no cost with an in-network doctor.',
      'Ask for your blood pressure, cholesterol, blood sugar if you are 35 to 70 and overweight, and your 10-year heart risk.',
      'US guidelines count blood pressure of 130/80 or more as high, lower than the UK threshold of 140/90.',
    ],
    uk: [
      'Free every 5 years for adults aged 40 to 74 in England without certain long-term conditions.',
      'Not been invited? Contact your GP practice and ask to book one.',
      'In Scotland, Wales and Northern Ireland, ask your GP practice or pharmacist what is offered.',
    ],
  },
  'psa-test-uk': {
    us: [
      'This guide covers the UK. In the US, the PSA test is a choice you make with your doctor.',
      'The US Preventive Services Task Force says testing is a personal decision from 55 to 69, and advises against routine testing from 70.',
      'The American Cancer Society suggests talking about it from 50, from 45 if you are Black or your father or brother had prostate cancer before 65, and from 40 if more than one close relative did.',
      'Most plans cover a PSA test, and Medicare covers one a year from 50.',
    ],
    uk: [
      'There is no routine screening for most men, but you can ask a GP about a PSA test from 50, or 45 if you are at higher risk.',
      'The test is free on the NHS once you and your GP agree it is right for you.',
      'A targeted screening programme for men with a BRCA2 gene change is due to start in England from 2027.',
    ],
  },
  'whoop-vs-oura-men-over-40': {
    us: [
      'WHOOP: One $199, Peak $239 or Life $359 a year, band included.',
      'Oura Ring 5: $399 in silver or black, $499 in other finishes, plus $5.99 a month for membership.',
      'Over three years, Oura costs about $610 and WHOOP $597 to $1,077, depending on the tier.',
      'Call 911 for chest pain that does not settle.',
    ],
    uk: [
      'WHOOP: One £169, Peak £229 or Life £349 a year, band included.',
      'Oura Ring 5: £399 to £499, plus £5.99 a month or £70 a year.',
      'Call 999 for chest pain that does not settle.',
    ],
  },
  'health-checks-for-men': {
    us: [
      'Book a yearly preventive visit. Most plans cover recommended screenings at no cost with an in-network doctor.',
      'Blood pressure of 130/80 or more counts as high. Cholesterol every 4 to 6 years, and blood sugar from 35 to 70 if you are overweight.',
      'Colorectal cancer screening from 45 to 75. PSA: talk to your doctor from 50, or 40 to 45 if you are at higher risk.',
      US_CRISIS,
    ],
    uk: [
      'Free NHS Health Check every 5 years from 40 to 74 in England, and free pharmacy blood pressure checks from 40.',
      'Blood pressure of 140/90 or more at a clinic counts as high. Bowel screening kits are posted every 2 years from 50 to 74.',
      'Self-refer to NHS Talking Therapies in England without seeing a GP.',
      UK_CRISIS,
    ],
  },
  'sauna-benefits-for-men': {
    us: [
      'US activity guidelines match the UK: 150 minutes of moderate activity a week, plus strength work on 2 days.',
      'Call 911 for chest pain, severe breathlessness, confusion or fainting after heat.',
    ],
    uk: [
      'The NHS recommends 150 minutes of moderate activity a week, plus strength work on 2 days.',
      'Call 999 for chest pain, severe breathlessness, confusion or fainting after heat.',
    ],
  },
  'best-supplements-for-men-over-40': {
    us: [
      'The FDA does not approve supplements before they go on sale. Look for a USP Verified or NSF Certified mark, which shows independent testing.',
      'US advice for vitamin D is 600 IU (15 micrograms) a day up to age 70, mostly from food. Ask your doctor before taking more.',
      'Ashwagandha is widely sold, but the NIH notes reports of liver injury. Check with a doctor or pharmacist if you take regular medicines.',
    ],
    uk: [
      'The NHS advises everyone to consider 10 micrograms (400 IU) of vitamin D a day from October to early March.',
      'The UK food watchdog is reviewing the safety of ashwagandha.',
      'Check labels against NHS upper limits, and ask a pharmacist if you take regular medicines.',
    ],
  },
  'why-do-i-wake-up-at-3am': {
    us: [
      'The CDC says adults need at least 7 hours of sleep a night.',
      'Ask your doctor about CBT for insomnia (CBT-I), the first treatment US sleep specialists recommend. Some apps and online programs offer it.',
      US_CRISIS,
    ],
    uk: [
      'The NHS says adults need 7 to 9 hours, and offers CBT for insomnia, including online programmes.',
      'See a GP if low mood has lasted more than 2 weeks, or if you think you have sleep apnoea.',
      UK_CRISIS,
    ],
  },
  'is-creatine-safe-men-over-40': {
    us: [
      'Creatine is sold as a dietary supplement, which the FDA does not approve before sale. Choose a product with NSF Certified for Sport or Informed Choice testing.',
      'US guidelines match the UK on strength training: at least 2 days a week.',
      'Call 911 for chest pain, severe breathlessness or fainting during exercise.',
    ],
    uk: [
      'UK law allows one health claim: 3 g a day can boost the effect of strength training on muscle strength in adults over 55.',
      'Look for Creapure or Informed Sport testing.',
      'Call 999 for chest pain, severe breathlessness or fainting during exercise.',
    ],
  },
  'signs-of-burnout-in-men': {
    us: [
      'Ask your doctor, or check whether your employer has an Employee Assistance Program, which often includes free counseling sessions.',
      'For help finding treatment, call SAMHSA free on 1-800-662-4357, any time.',
      US_CRISIS,
    ],
    uk: [
      'Adults in England can refer themselves to NHS Talking Therapies for free CBT and counselling, without seeing a GP.',
      'In England, NHS 111 option 2 gives urgent mental health support.',
      UK_CRISIS,
    ],
  },
  'erectile-dysfunction-causes': {
    us: [
      'Sildenafil (Viagra) and tadalafil need a prescription in the US. Your doctor or a licensed telehealth service can prescribe them.',
      'The FDA warns that many "male enhancement" supplements contain hidden prescription drugs. Avoid them.',
      'If you drink, keep to 2 drinks a day or fewer.',
    ],
    uk: [
      'A pharmacist can supply sildenafil after a short private chat, without a prescription, or a GP can prescribe it.',
      'The MHRA warns that some "herbal" erection products contain hidden medicines.',
      'Keep alcohol to 14 units a week or less.',
    ],
  },
  'enlarged-prostate-symptoms-treatment': {
    us: [
      'Start with your primary care doctor, who may refer you to a urologist.',
      'Most prostate medicines, such as tamsulosin, need a prescription.',
      'The NIH says saw palmetto works no better than a placebo for urinary symptoms.',
    ],
    uk: [
      'Start with your GP, who may refer you to a urologist.',
      'Prostate Cancer UK and the NHS have free guides to symptoms and treatment.',
      'Call 999 if you cannot pee at all and are in pain.',
    ],
  },
  'how-to-check-your-testicles': {
    us: [
      'US doctors do not screen for testicular cancer, but the American Cancer Society encourages men to know what is normal for them and report changes.',
      'Around 9,000 to 10,000 men in the US are diagnosed each year, mostly aged 20 to 40.',
      'Sudden, severe pain is an emergency: go to the ER or call 911.',
    ],
    uk: [
      'The NHS recommends checking about once a month.',
      'Around 2,300 men in the UK are diagnosed each year.',
      'Sudden, severe pain is an emergency: go to A&E or call 999.',
    ],
  },
  'low-testosterone-symptoms-after-40': {
    us: [
      'US advice for vitamin D is 600 IU (15 micrograms) a day up to age 70, mostly from food.',
      'If you drink, keep to 2 drinks a day or fewer. A US drink holds about 1.75 UK units.',
      'Testosterone treatment needs a prescription. Be wary of clinics that offer it without a proper blood test and follow-up.',
      US_CRISIS,
    ],
    uk: [
      'The NHS advises 10 micrograms of vitamin D a day from October to early March.',
      'Keep alcohol to 14 units a week or less, spread over several days.',
      UK_CRISIS,
    ],
  },
  'prostate-health-what-every-man-should-know': {
    us: [
      'About 1 in 8 US men will be diagnosed with prostate cancer, according to the American Cancer Society.',
      'PSA testing is a choice to make with your doctor: from 55 to 69 by US Preventive Services Task Force advice, or from 50 (45 if higher risk) by American Cancer Society advice.',
      'ZERO Prostate Cancer and the Prostate Cancer Foundation have free guides and support.',
      'Call 911 if you cannot pee at all and are in pain.',
    ],
    uk: [
      'About 1 in 8 UK men will be diagnosed. There is no routine screening, but you can ask a GP for a PSA test from 50, or 45 if at higher risk.',
      'Prostate Cancer UK has a free 30-second risk checker, and specialist nurses on 0800 074 8383.',
      'Call NHS 111 for urgent advice, or 999 if you cannot pee at all and are in pain.',
    ],
  },
  'apob-vs-ldl-heart-health': {
    us: [
      'US labs report cholesterol in mg/dL. 4 mmol/L of non-HDL cholesterol is about 155 mg/dL.',
      'US guidelines treat an ApoB of 130 mg/dL or more as a "risk-enhancing" factor. Many doctors will order it if you ask, and most labs can run it.',
      'Ask for your 10-year heart risk. US doctors often use the AHA PREVENT calculator.',
    ],
    uk: [
      'UK labs report cholesterol in mmol/L. NICE uses non-HDL cholesterol and the QRISK3 calculator, not ApoB.',
      'The NHS can measure ApoB, but it is not part of routine testing.',
      'If you are 40 to 74 in England, your free NHS Health Check includes a cholesterol test.',
    ],
  },
  'zone-2-aerobic-engine-guide': {
    us: [
      'The Physical Activity Guidelines for Americans match the UK: 150 minutes of moderate activity or 75 minutes of vigorous activity a week, plus strength work on 2 days.',
      'Stop and call 911 if you get signs of a heart attack while exercising.',
    ],
    uk: [
      'The NHS recommends the same: 150 minutes of moderate activity or 75 minutes of vigorous activity a week, plus strength work on 2 days.',
      'Stop and call 999 if you get signs of a heart attack while exercising.',
    ],
  },
  'deep-sleep-testosterone-link': {
    us: [
      'The CDC says adults need at least 7 hours of sleep a night.',
      'Ask your doctor about CBT for insomnia (CBT-I), the first treatment US sleep specialists recommend.',
    ],
    uk: [
      'The NHS says adults need 7 to 9 hours a night.',
      'The NHS offers CBT for insomnia, including online programmes.',
    ],
  },
  'protein-distribution-muscle-longevity': {
    us: [
      'The US recommended amount for adults is 0.8 g of protein per kg of body weight a day (about 0.36 g per pound).',
      'US dietary guidelines suggest about 8 ounces of seafood a week, roughly two servings.',
    ],
    uk: [
      'UK guidance is 0.75 g of protein per kg of body weight a day.',
      'The NHS Eatwell Guide suggests 2 portions of fish a week, 1 of them oily.',
    ],
  },
  'allostatic-load-cortisol-management': {
    us: [
      'Ask your doctor, or check whether your employer has an Employee Assistance Program, which often includes free counseling sessions.',
      'For help finding treatment, call SAMHSA free on 1-800-662-4357, any time.',
      US_CRISIS,
    ],
    uk: [
      'Adults in England can refer themselves to NHS Talking Therapies, without seeing a GP.',
      'For urgent help that is not an emergency, call NHS 111 or use NHS 111 online.',
      UK_CRISIS,
    ],
  },
};

// US and UK prices for reviews. Reviews not listed show their single price.
export const REVIEW_PRICES: Record<string, { us: string; uk: string }> = {
  'whoop-5-review': { us: 'From $199 a year', uk: 'From £169 a year' },
  'oura-ring-5-review': { us: '$399 to $499 + $5.99/month', uk: '£399 to £499 + £5.99/month' },
  'cold-plunge-tub-review': { us: 'Under $100 to thousands', uk: 'Under £100 to thousands' },
};
