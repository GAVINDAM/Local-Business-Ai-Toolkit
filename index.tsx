import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LocalBizDashboard() {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [tone, setTone] = useState('Professional');
  const [platform, setPlatform] = useState('Instagram');
  const [goal, setGoal] = useState('Promote Offer');
  const [aiOutput, setAiOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const generatePost = async () => {
    setLoading(true);
    const prompt = `Generate a social media post for a ${industry} business called ${businessName}. Goal: ${goal}. Platform: ${platform}. Tone: ${tone}.`;
    const response = await fetch('/api/generate-post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    setAiOutput(data.result);
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-bold">Business Setup</h2>
          <Input placeholder="Business Name" value={businessName} onChange={e => setBusinessName(e.target.value)} />
          <Input placeholder="Industry (e.g., Salon, Café)" value={industry} onChange={e => setIndustry(e.target.value)} />
          <select className="w-full p-2 border rounded" value={tone} onChange={e => setTone(e.target.value)}>
            <option value="Professional">Professional</option>
            <option value="Casual">Casual</option>
            <option value="Fun">Fun</option>
          </select>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-bold">Generate Social Media Post</h2>
          <select className="w-full p-2 border rounded" value={platform} onChange={e => setPlatform(e.target.value)}>
            <option value="Instagram">Instagram</option>
            <option value="Facebook">Facebook</option>
            <option value="Google Business">Google Business</option>
          </select>
          <select className="w-full p-2 border rounded" value={goal} onChange={e => setGoal(e.target.value)}>
            <option value="Promote Offer">Promote Offer</option>
            <option value="Announce News">Announce News</option>
            <option value="Educate">Educate</option>
            <option value="Celebrate Holiday">Celebrate Holiday</option>
          </select>
          <Button onClick={generatePost} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Post'}
          </Button>
          {aiOutput && (
            <div className="p-4 border rounded bg-gray-100">
              <p>{aiOutput}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
