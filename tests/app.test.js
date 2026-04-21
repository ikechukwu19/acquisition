import app from '#src/app.js';
import request from 'supertest';

describe('API Endpoints', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const res = await request(app).get('/health').expect(200);
      expect(res.body).toHaveProperty('status', 'OK');
      expect(res.body).toHaveProperty('timeStamp');
      expect(res.body).toHaveProperty('uptime');
    });
  });
  describe('GET /api', () => {
    it('should check if API is running', async () => {
      const res = await request(app).get('/api').expect(200);
      expect(res.body).toHaveProperty('message', 'Acqusitions API is running');
    });
  });
  describe('GET /non-existent', () => {
    it('should return 404 for non existent', async () => {
      const res = await request(app).get('/nonexistent').expect(404);
      expect(res.body).toHaveProperty('error', 'Route not found');
    });
  });
});
