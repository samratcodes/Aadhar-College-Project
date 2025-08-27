'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { marked } from 'marked';

const GenerateInsights = ({ selectedMetric, values, dates }) => {
  const [insights, setInsights] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Common healthcare metrics and their explanations
  const metricDescriptions = {
    'Blood Pressure': 'Normal range: 120/80 mmHg. High blood pressure (hypertension) is 130/80 or higher.',
    'Heart Rate': 'Normal resting heart rate: 60-100 bpm. Athletes may have 40-60 bpm.',
    'Blood Sugar': 'Normal fasting glucose: 70-100 mg/dL. Diabetes is 126 mg/dL or higher.',
    'Oxygen Saturation': 'Normal range: 95-100%. Below 90% is concerning.',
    'Cholesterol': 'Desirable total cholesterol: <200 mg/dL. LDL should be <100 mg/dL.',
    'Weight': 'Healthy BMI range: 18.5-24.9 kg/m².',
    'Temperature': 'Normal body temperature: 97.8°F (36.5°C) to 99°F (37.2°C).'
  };

  const handleClick = async () => {
    if (values.length === 0 || dates.length === 0) {
      setError('Please provide data before generating insights');
      return;
    }

    setIsLoading(true);
    setError('');
    setInsights('');

    try {
      const dataPoints = values.map((val, idx) => `• ${dates[idx]}: ${val}`).join('\n');
      const metricDescription = metricDescriptions[selectedMetric] || '';

      const prompt = `
        You are a compassionate medical expert analyzing ${selectedMetric} data for a patient. Here are their measurements over time:

${dataPoints}

${metricDescription ? `**Normal Range:** ${metricDescription}` : ''}

**Provide a short, easy-to-understand analysis (3-4 sentences max) with this structure:**
1. **🔍 What’s happening?**  
   - Highlight *one* key trend (e.g., "gradual increase," "stable," or "unusual spike on [date]").  
   - Compare to normal ranges if relevant.  

2. **❗ Why it matters?**  
   - *Plain-language* implication (e.g., "This could mean your heart is working harder than usual").  
   - Use analogies if helpful (e.g., "Like a car engine running at high RPM").  

3. **✅ What to do?**  
   - *Actionable* advice (e.g., "Monitor for headaches" or "Check again in 2 weeks").  
   - When to seek help: "Consult a doctor if [specific symptom] occurs."  

**End with this disclaimer (verbatim):**  
*"ℹ️ AI-generated insight: This analysis is meant to support (not replace) professional medical advice. While we strive for accuracy, always consult a doctor for personalized care."*  

**Rules:**  
- Use **bold** for headers (no bullet points).  
- Avoid jargon (e.g., say "high blood sugar" instead of "hyperglycemia").  
- Sound reassuring but honest.  
- Never diagnose—only suggest follow-ups.  
      `;

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${
          process.env.NEXT_PUBLIC_GEMINI_KEY
        }`,
        {
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.3, // Reduce randomness for medical accuracy
            topP: 0.8
          }
        },
        {
          timeout: 10000 // 10 second timeout
        }
      );

      const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 
                  "Could not generate insights. Please try again.";
      setInsights(marked.parse(text));
    } catch (error) {
      console.error('Generation error:', error);
      setError('Failed to generate insights. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <button 
        onClick={handleClick}
        disabled={isLoading}
        className={`px-4 py-2 rounded-md transition-colors duration-300 ${
          isLoading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-green-600 hover:bg-green-700 text-white'
        }`}
        aria-busy={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin">↻</span> Analyzing...
          </span>
        ) : 'Generate Insights'}
      </button>

      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md">
          ⚠️ {error}
        </div>
      )}

      {insights && (
        <div className="p-4 bg-blue-50 rounded-md prose max-w-none text-gray-900">
          <h3 className="text-lg font-semibold mb-2">Insights for {selectedMetric}</h3>
          <div dangerouslySetInnerHTML={{ __html: insights }} />
        </div>
      )}
    </div>
  );
};

export default GenerateInsights;
