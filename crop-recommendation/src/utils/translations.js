export const t = (lang, key) => {
  const data = {
    en: {
      recommendations: "Recommendations",
      soil: "Soil Details",
      crop: "Recommended Crop",
      fertilizer: "Fertilizer",
      submit: "Get Recommendation",
    },
    hi: {
      recommendations: "सिफारिशें",
      soil: "मिट्टी विवरण",
      crop: "अनुशंसित फसल",
      fertilizer: "उर्वरक",
      submit: "सिफारिश प्राप्त करें",
    },
    te: {
      recommendations: "సిఫార్సులు",
      soil: "మట్టి వివరాలు",
      crop: "సిఫారసు చేసిన పంట",
      fertilizer: "ఎరువు",
      submit: "సిఫారసు పొందండి",
    },
  };

  return data[lang][key];
};
