import { describe, it, expect } from 'vitest';
import { appendUserMessage, appendAssistantMessage, getTrimmedHistory } from '../src/utils.js';

describe('appendUserMessage', () => {
  it('agrega objeto { role: "user", content } al array', () => {
    const history = [];
    const result = appendUserMessage(history, 'hola');
    expect(result).toEqual([{ role: 'user', content: 'hola' }]);
  });

  it('no muta el array original', () => {
    const history = [{ role: 'user', content: 'previo' }];
    appendUserMessage(history, 'nuevo');
    expect(history).toHaveLength(1);
  });
});

describe('appendAssistantMessage', () => {
  it('agrega objeto { role: "assistant", content } al array', () => {
    const history = [];
    const result = appendAssistantMessage(history, 'respuesta');
    expect(result).toEqual([{ role: 'assistant', content: 'respuesta' }]);
  });
});

describe('getTrimmedHistory', () => {
  it('devuelve los últimos N elementos', () => {
    const history = Array.from({ length: 30 }, (_, i) => ({ role: 'user', content: `msg${i}` }));
    const result = getTrimmedHistory(history, 10);
    expect(result).toHaveLength(10);
    expect(result[0].content).toBe('msg20');
  });

  it('con array más corto que N devuelve el array completo', () => {
    const history = [{ role: 'user', content: 'uno' }, { role: 'assistant', content: 'dos' }];
    const result = getTrimmedHistory(history, 20);
    expect(result).toHaveLength(2);
    expect(result).toEqual(history);
  });
});
