import React, { useState } from 'react';
import {
  ExternalLink,
  Check,
  ShieldAlert,
  Sparkles,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Copy,
  Bot,
} from 'lucide-react';

interface StrategyItem {
  notObserved: boolean;
  excerpt: string;
}

interface Lesson2Props {
  curiosity: StrategyItem;
  flattery: StrategyItem;
  socialPresence: StrategyItem;
  authority: StrategyItem;
  isCompleted: boolean;
  onUpdateStrategy: (
    key: 'curiosity' | 'flattery' | 'socialPresence' | 'authority',
    data: StrategyItem
  ) => void;
  onToggleCompleted: () => void;
  onOpenInDocs: () => void;
  onShowToast?: (type: 'success' | 'error' | 'info', title: string, message?: string) => void;
}

const GEMINI_INITIAL_PROMPT = `Sou estudante do 2º ano do ensino médio e estou criando uma política de uso de IA para estudar sem deixar de aprender. Quero conversar com você para fazer um brainstorming e pensar em ideias. Atue como um tutor e não me dê respostas prontas.

Podemos começar?`;

export const Lesson2HumanDesign: React.FC<Lesson2Props> = ({
  curiosity,
  flattery,
  socialPresence,
  authority,
  isCompleted,
  onUpdateStrategy,
  onToggleCompleted,
  onOpenInDocs,
  onShowToast,
}) => {
  const [showPromptAccordion, setShowPromptAccordion] = useState(true);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(GEMINI_INITIAL_PROMPT);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2500);
      if (onShowToast) {
        onShowToast(
          'success',
          'Prompt copiado com sucesso!',
          'Cole no Gemini para iniciar sua conversa.'
        );
      }
    } catch (err) {
      console.error('Falha ao copiar prompt:', err);
      if (onShowToast) {
        onShowToast('error', 'Falha ao copiar', 'Selecione e copie o texto manualmente.');
      }
    }
  };

  const strategies = [
    {
      key: 'curiosity' as const,
      name: 'Curiosidade simulada',
      badge: 'Engajamento artificial',
      desc: 'A IA faz perguntas no final de cada resposta apenas para prolongar o diálogo e manter você conversando com a ferramenta.',
      data: curiosity,
    },
    {
      key: 'flattery' as const,
      name: 'Bajulação',
      badge: 'Elogio automático',
      desc: 'A IA elogia seu raciocínio com frases como "Excelente pergunta!", "Que raciocínio brilhante!", validando você mesmo sem critério.',
      data: flattery,
    },
    {
      key: 'socialPresence' as const,
      name: 'Presença social',
      badge: 'Ilusão de pessoa',
      desc: 'A IA usa primeira pessoa ("eu acho", "eu sinto", "estou feliz em ajudar"), simulando sentimentos ou consciência que não possui.',
      data: socialPresence,
    },
    {
      key: 'authority' as const,
      name: 'Sinalização de autoridade',
      badge: 'Certeza infundada',
      desc: 'A IA soa extremamente confiante, com tom acadêmico ou categórico, mesmo quando inventa fatos (alucinação) ou distorce fontes.',
      data: authority,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-purple-100 text-purple-800">
              Aula 2
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2 font-display">
              Projetada para parecer humano
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenInDocs}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs cursor-pointer"
              title="Copiar dados da aula e abrir novo documento no Google Docs"
            >
              <ExternalLink className="w-4 h-4" />
              Abrir no Docs
            </button>
            <button
              onClick={onToggleCompleted}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                isCompleted
                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Check className="w-4 h-4" />
              {isCompleted ? 'Concluída' : 'Marcar concluída'}
            </button>
          </div>
        </div>

        {/* Instrução Direta */}
        <div className="mt-6 flex items-start gap-3 p-4 bg-sky-50 rounded-xl border border-sky-100">
          <MessageSquare className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Depois de conversar com o chat por <strong>6 a 8 trocas de mensagens</strong>, procure em cada resposta da IA um trecho que ilustre as estratégias de design conversacional abaixo.
          </p>
        </div>

        {/* Aviso de Privacidade */}
        <div className="mt-4 flex items-center gap-2 px-3.5 py-2.5 bg-amber-50 rounded-lg border border-amber-200/80 text-amber-900 text-xs sm:text-sm">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Aviso de privacidade:</strong> Não coloque nomes, contatos ou dados pessoais de ninguém nas transcrições.
          </span>
        </div>

        {/* Painel Retrátil: Prompt Inicial do Gemini */}
        <div className="mt-6 border border-purple-200 rounded-xl overflow-hidden bg-purple-50/40 shadow-2xs">
          <button
            type="button"
            onClick={() => setShowPromptAccordion(!showPromptAccordion)}
            aria-expanded={showPromptAccordion}
            className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-purple-950 hover:bg-purple-100/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Bot className="w-5 h-5 text-purple-600 shrink-0" />
              <div>
                <span className="block text-sm font-bold text-purple-950">
                  Prompt inicial para iniciar a conversa com o Gemini
                </span>
                <span className="block text-xs font-normal text-purple-700">
                  Clique para {showPromptAccordion ? 'ocultar' : 'exibir'} o comando de abertura do diálogo investigativo
                </span>
              </div>
            </div>
            {showPromptAccordion ? (
              <ChevronUp className="w-5 h-5 text-purple-700 shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-purple-700 shrink-0" />
            )}
          </button>

          {showPromptAccordion && (
            <div className="p-4 pt-1 border-t border-purple-100 space-y-3 bg-white/70">
              <p className="text-xs text-slate-600 leading-relaxed">
                Copie o prompt abaixo e cole no Google Gemini como sua primeira mensagem. Mantenha um diálogo de <strong>6 a 8 trocas de mensagens</strong> atuando em conjunto com a IA antes de preencher os campos desta aula:
              </p>

              <div className="bg-slate-50 p-4 rounded-xl border border-purple-200/80 text-slate-800 text-xs sm:text-sm whitespace-pre-wrap leading-relaxed font-sans shadow-2xs">
                {GEMINI_INITIAL_PROMPT}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <span className="text-xs text-purple-800 font-medium">
                  Dica: Peça sugestões e compare as respostas da IA com as 4 estratégias abaixo.
                </span>

                <div className="flex items-center gap-2">
                  <a
                    href="https://gemini.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-700 bg-white hover:bg-purple-50 border border-purple-200 rounded-lg transition-colors cursor-pointer shadow-2xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Abrir Google Gemini
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyPrompt}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs ${
                      copiedPrompt
                        ? 'bg-emerald-600 text-white'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                  >
                    {copiedPrompt ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copiar Prompt
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tabela de Estratégias */}
        <div className="mt-8 space-y-5">
          {strategies.map((strat, index) => {
            const isNotObserved = strat.data.notObserved;

            return (
              <div
                key={strat.key}
                className={`rounded-xl border transition-all p-5 ${
                  isNotObserved
                    ? 'bg-slate-50 border-slate-200 opacity-90'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center">
                        {index + 1}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        {strat.name}
                      </h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100 font-medium">
                        {strat.badge}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                      {strat.desc}
                    </p>
                  </div>

                  {/* Toggle Não observado */}
                  <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors cursor-pointer select-none shrink-0 text-xs sm:text-sm">
                    <input
                      type="checkbox"
                      checked={isNotObserved}
                      onChange={(e) => {
                        onUpdateStrategy(strat.key, {
                          notObserved: e.target.checked,
                          excerpt: e.target.checked ? '' : strat.data.excerpt,
                        });
                      }}
                      className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4"
                    />
                    <span className="font-medium text-slate-700">
                      Não observado nesta conversa
                    </span>
                  </label>
                </div>

                {/* Campo de Trecho */}
                <div className="mt-3">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Trecho da resposta da IA que comprova a estratégia:
                  </label>
                  <textarea
                    rows={2}
                    disabled={isNotObserved}
                    value={strat.data.excerpt}
                    onChange={(e) => {
                      onUpdateStrategy(strat.key, {
                        ...strat.data,
                        excerpt: e.target.value,
                      });
                    }}
                    placeholder={
                      isNotObserved
                        ? 'Estratégia marcada como "Não observado" — campo desabilitado.'
                        : 'Cole aqui o trecho exato onde a IA usou essa estratégia...'
                    }
                    className={`w-full p-3 text-sm rounded-lg border transition-colors ${
                      isNotObserved
                        ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                        : 'bg-white text-slate-900 border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Nota pedagógica final */}
        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
          <span>
            <strong>Dica de metacognição:</strong> Reconhecer quando a IA está usando bajulação ou fingindo sentimentos humanos ajuda você a não confiar cegamente no que a máquina diz.
          </span>
        </div>
      </div>
    </div>
  );
};