import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useProdutos } from '../../hooks/useProdutos';
import { useFeedbacks } from '../../hooks/useFeedbacks';
import { HeaderAdmin } from '../../components/common/HeaderAdmin';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './DashboardAdmin.css';

export function DashboardAdmin() {
  const { user } = useAuth();
  const { todosProdutos } = useProdutos();
  const { todosFeedbacks } = useFeedbacks();

  const [precoVenda, setPrecoVenda] = useState(6);
  const [custo, setCusto] = useState(3);
  const [quantidade, setQuantidade] = useState(50);

  const [novoLancamento, setNovoLancamento] = useState('');
  const [novaDespesa, setNovaDespesa] = useState('');
  const [totalReceitas, setTotalReceitas] = useState(() => {
    const salvo = localStorage.getItem('caixa_receitas');
    return salvo ? parseFloat(salvo) : 0;
  });
  const [totalDespesas, setTotalDespesas] = useState(() => {
    const salvo = localStorage.getItem('caixa_despesas');
    return salvo ? parseFloat(salvo) : 0;
  });
  const [historico, setHistorico] = useState(() => {
    const salvo = localStorage.getItem('caixa_historico');
    return salvo ? JSON.parse(salvo) : [];
  });
  const [abaAtiva, setAbaAtiva] = useState('receita');

  useEffect(() => {
    localStorage.setItem('caixa_receitas', totalReceitas.toString());
  }, [totalReceitas]);

  useEffect(() => {
    localStorage.setItem('caixa_despesas', totalDespesas.toString());
  }, [totalDespesas]);

  useEffect(() => {
    localStorage.setItem('caixa_historico', JSON.stringify(historico));
  }, [historico]);

  const lucroLiquido = totalReceitas - totalDespesas;

  const agora = () => new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const handleAdicionarReceita = () => {
    const valor = parseFloat(novoLancamento.replace(',', '.'));
    if (isNaN(valor) || valor <= 0) { alert('Informe um valor válido!'); return; }
    setTotalReceitas(prev => prev + valor);
    setHistorico(prev => [...prev, { tipo: 'receita', valor, hora: agora() }]);
    setNovoLancamento('');
  };

  const handleAdicionarDespesa = () => {
    const valor = parseFloat(novaDespesa.replace(',', '.'));
    if (isNaN(valor) || valor <= 0) { alert('Informe um valor válido!'); return; }
    setTotalDespesas(prev => prev + valor);
    setHistorico(prev => [...prev, { tipo: 'despesa', valor, hora: agora() }]);
    setNovaDespesa('');
  };

  const dadosGrafico = () => {
    if (historico.length === 0) return [];
    let recAcum = 0, desAcum = 0;
    return historico.map((item) => {
      if (item.tipo === 'receita') recAcum += item.valor;
      else desAcum += item.valor;
      return {
        hora: item.hora,
        Receitas: parseFloat(recAcum.toFixed(2)),
        Despesas: parseFloat(desAcum.toFixed(2)),
      };
    });
  };

  const totalProdutos = todosProdutos.data?.length || 0;
  const lucroEstimado = (precoVenda - custo) * quantidade;
  const grafico = dadosGrafico();

  return (
    <>
      <HeaderAdmin />
      <div className="dashboard-admin-moderno">
        <div className="dashboard-header">
          <h1>Cantina Escolar</h1>
          <p className="welcome">Olá, {user?.nome}! 👋</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card lucro-total">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>Receitas do Dia</h3>
              <p className="stat-value">R$ {totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </div>
          </div>
          <div className="stat-card vendas-hoje">
            <div className="stat-icon">📉</div>
            <div className="stat-info">
              <h3>Despesas do Dia</h3>
              <p className="stat-value">R$ {totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </div>
          </div>
          <div className="stat-card produtos">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3>Lucro Líquido</h3>
              <p className="stat-value" style={{ color: lucroLiquido >= 0 ? '#5c6b3a' : '#c0392b' }}>
                R$ {lucroLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>

        {/* Caixa */}
        <div className="caixa-container">
          <h2>💵 Caixa do Dia</h2>

          <div className="caixa-totais-grid">
            <div className="caixa-total-box receita">
              <span className="caixa-total-lbl">Receitas</span>
              <span className="caixa-total-val">R$ {totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="caixa-total-box despesa">
              <span className="caixa-total-lbl">Despesas</span>
              <span className="caixa-total-val">R$ {totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="caixa-total-box liquido">
              <span className="caixa-total-lbl">Lucro Líquido</span>
              <span className="caixa-total-val" style={{ color: lucroLiquido >= 0 ? '#fffef9' : '#f09595' }}>
                R$ {lucroLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="caixa-abas">
            <button
              className={`caixa-aba ${abaAtiva === 'receita' ? 'active' : ''}`}
              onClick={() => setAbaAtiva('receita')}
            >
              + Receita
            </button>
            <button
              className={`caixa-aba despesa ${abaAtiva === 'despesa' ? 'active' : ''}`}
              onClick={() => setAbaAtiva('despesa')}
            >
              - Despesa
            </button>
          </div>

          {abaAtiva === 'receita' && (
            <div className="caixa-input-row">
              <input
                type="number"
                className="caixa-input"
                placeholder="Valor da venda (ex: 12,50)"
                value={novoLancamento}
                onChange={(e) => setNovoLancamento(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdicionarReceita()}
              />
              <button className="caixa-btn-add" onClick={handleAdicionarReceita}>
                + Adicionar
              </button>
            </div>
          )}

          {abaAtiva === 'despesa' && (
            <div className="caixa-input-row">
              <input
                type="number"
                className="caixa-input despesa"
                placeholder="Valor da despesa (ex: 30,00)"
                value={novaDespesa}
                onChange={(e) => setNovaDespesa(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdicionarDespesa()}
              />
              <button className="caixa-btn-add despesa" onClick={handleAdicionarDespesa}>
                - Registrar
              </button>
            </div>
          )}

          {historico.length > 0 && (
            <div className="caixa-historico">
              <div className="caixa-historico-title">Lançamentos de hoje</div>
              {historico.slice().reverse().map((item, i) => (
                <div key={i} className="caixa-historico-item">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className={`caixa-hist-badge ${item.tipo}`}>
                      {item.tipo === 'receita' ? 'Receita' : 'Despesa'}
                    </span>
                    <span className="caixa-hist-hora">{item.hora}</span>
                  </div>
                  <span className={`caixa-hist-valor ${item.tipo}`}>
                    {item.tipo === 'receita' ? '+' : '-'} R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Gráfico */}
        <div className="grafico-container">
          <h2>📈 Evolução do Caixa</h2>
          <div className="grafico-header">
            <h3>Lançamentos acumulados do dia</h3>
          </div>

          {grafico.length === 0 ? (
            <div className="grafico-vazio">
              Nenhum lançamento ainda — adicione receitas ou despesas para ver o gráfico.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={grafico} barCategoryGap="35%">
                <XAxis dataKey="hora" hide />
                <YAxis
                  tick={{ fontSize: 11, fill: '#8a8578' }}
                  tickFormatter={(v) => `R$ ${v}`}
                  axisLine={false}
                  tickLine={false}
                  tickCount={5}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(26,26,24,0.04)' }}
                  contentStyle={{
                    background: '#1a1a18',
                    border: 'none',
                    borderRadius: 10,
                    padding: '10px 14px',
                  }}
                  labelStyle={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}
                  itemStyle={{ color: '#fffef9', fontSize: 13 }}
                  formatter={(value) => `R$ ${value.toFixed(2)}`}
                  labelFormatter={() => 'Lançamento'}
                />
                <Bar dataKey="Receitas" fill="rgba(92,107,58,0.9)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Despesas" fill="rgba(201,98,63,0.9)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}

          <div className="grafico-legenda">
            <div className="grafico-leg-item">
              <span className="grafico-leg-sq" style={{ background: '#5c6b3a' }}></span>
              Receitas
            </div>
            <div className="grafico-leg-item">
              <span className="grafico-leg-sq" style={{ background: '#c9623f' }}></span>
              Despesas
            </div>
          </div>
        </div>

        {/* Two columns */}
        <div className="two-columns">
          <div className="resumo-vendas">
            <h2>📋 Resumo de Vendas</h2>
            <div className="resumo-stats">
              <div className="resumo-item">
                <span>Lançamentos:</span>
                <strong>{historico.length}</strong>
              </div>
              <div className="resumo-item">
                <span>Total receitas:</span>
                <strong>R$ {totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
              </div>
              <div className="resumo-item">
                <span>Total despesas:</span>
                <strong>R$ {totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
              </div>
              <div className="resumo-item">
                <span>Lucro líquido:</span>
                <strong style={{ color: lucroLiquido >= 0 ? '#5c6b3a' : '#c0392b' }}>
                  R$ {lucroLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </strong>
              </div>
            </div>
          </div>

          <div className="calculadora-lucro">
            <h2>🧮 Calculadora de Lucro</h2>
            <div className="calculadora-form">
              <div className="input-group">
                <label>Preço de Venda:</label>
                <input type="number" value={precoVenda} onChange={(e) => setPrecoVenda(Number(e.target.value))} />
              </div>
              <div className="input-group">
                <label>Custo:</label>
                <input type="number" value={custo} onChange={(e) => setCusto(Number(e.target.value))} />
              </div>
              <div className="input-group">
                <label>Quantidade:</label>
                <input type="number" value={quantidade} onChange={(e) => setQuantidade(Number(e.target.value))} />
              </div>
              <div className="resultado">
                <span>Lucro Estimado:</span>
                <strong>R$ {lucroEstimado.toLocaleString()}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Tabela */}
        <div className="produtos-tabela">
          <h2>📦 Gerenciar Produtos</h2>
          <button className="btn-adicionar" onClick={() => window.location.href = '/admin/produtos'}>
            + Adicionar Produto
          </button>
          <table className="produtos-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Preço de Venda</th>
                <th>Custo</th>
              </tr>
            </thead>
            <tbody>
              {todosProdutos.data?.slice(0, 3).map(produto => (
                <tr key={produto.id}>
                  <td>{produto.nome}</td>
                  <td>R$ {produto.preco.toFixed(2)}</td>
                  <td>R$ {(produto.preco * 0.4).toFixed(2)}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="3" className="ver-todos">
                  <a href="/admin/produtos">Ver todos os produtos →</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}