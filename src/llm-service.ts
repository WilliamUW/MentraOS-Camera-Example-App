import OpenAI from 'openai';

export interface LLMAnalysis {
  description: string;
  tags: string[];
  confidence: number;
  timestamp: Date;
}

export class LLMService {
  private openai: OpenAI;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not set in environment variables');
    }
    this.openai = new OpenAI({ apiKey });
  }

  /**
   * Analyze a photo using OpenAI's GPT-4 Vision
   */
  async analyzePhoto(imageBuffer: Buffer, mimeType: string): Promise<LLMAnalysis> {
    try {
      // Convert buffer to base64
      const base64Image = imageBuffer.toString('base64');
      
      const response = await this.openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze this image and provide: 1) A detailed description of what you see, 2) Relevant tags/keywords, 3) Your confidence level (0-1). Respond in JSON format: {\"description\": \"...\", \"tags\": [\"...\"], \"confidence\": 0.95}"
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:${mimeType};base64,${base64Image}`
                }
              }
            ]
          }
        ],
        max_tokens: 500
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response from OpenAI');
      }

      // Parse the JSON response
      const analysis = JSON.parse(content);
      
      return {
        description: analysis.description || 'No description available',
        tags: analysis.tags || [],
        confidence: analysis.confidence || 0,
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Error analyzing photo with LLM:', error);
      throw error;
    }
  }

  /**
   * Generate a creative caption for the photo
   */
  async generateCaption(imageBuffer: Buffer, mimeType: string): Promise<string> {
    try {
      const base64Image = imageBuffer.toString('base64');
      
      const response = await this.openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Generate a creative, engaging caption for this image in 1-2 sentences."
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:${mimeType};base64,${base64Image}`
                }
              }
            ]
          }
        ],
        max_tokens: 100
      });

      return response.choices[0]?.message?.content || 'No caption generated';
    } catch (error) {
      console.error('Error generating caption:', error);
      return 'Caption generation failed';
    }
  }
} 