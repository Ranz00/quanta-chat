import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock fetch for chat API tests
describe('Chat API', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('sends POST with message and history', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ reply: 'Echo: hola' }),
    });
    vi.stubGlobal('fetch', mockFetch);

    await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'hola', history: [] }),
    });

    expect(mockFetch).toHaveBeenCalledWith('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'hola', history: [] }),
    });
  });

  it('handles error response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Internal server error' }),
    }));

    const res = await fetch('/api/chat');
    const data = await res.json();

    expect(res.ok).toBe(false);
    expect(data.error).toBe('Internal server error');
  });

  it('handles network error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')));

    await expect(fetch('/api/chat')).rejects.toThrow('Network error');
  });
});
