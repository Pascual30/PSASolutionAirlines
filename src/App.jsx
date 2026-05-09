import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // <-- ESTO GARANTIZA QUE BOOTSTRAP FUNCIONE
import './App.css';

export default function App() {
  const [vista, setVista] = useState('busqueda'); 
  const [asiento, setAsiento] = useState(null);
  const [esCorporativo, setEsCorporativo] = useState(false);
  const [destino, setDestino] = useState('Miami (MIA)');
  
  const precioBase = 450;
  const descuento = 50;
  const total = esCorporativo ? precioBase - descuento : precioBase;

  const filas = [['1A', '1B'], ['2A', '2B'], ['3A', '3B']];
  const asientosOcupados = ['1B', '3A'];

  const reiniciarFlujo = () => {
    setAsiento(null); setEsCorporativo(false); setVista('busqueda');
  };

  return (
    <div className="min-vh-100 pb-5">
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm mb-5">
        <div className="container py-2">
          <span className="navbar-brand fw-bold fs-4">✈️ PSA Solution</span>
          <div className="d-flex align-items-center">
            <span className="text-white bg-dark px-3 py-1 rounded-pill small">Sesión: Cliente Demo</span>
          </div>
        </div>
      </nav>

      <div className="container">
        
        {/* === VISTA 1: BÚSQUEDA === */}
        {vista === 'busqueda' && (
          <div className="premium-card p-5 fade-in mx-auto" style={{maxWidth: '800px'}}>
            <h2 className="fw-bold mb-4">Reserva tu próximo vuelo</h2>
            <div className="row g-4">
              <div className="col-md-6">
                <label className="form-label text-muted fw-bold">Origen</label>
                <input type="text" className="form-control form-control-lg bg-light" value="Santo Domingo (SDQ)" readOnly />
              </div>
              <div className="col-md-6">
                <label className="form-label text-muted fw-bold">Destino</label>
                <select className="form-select form-select-lg" value={destino} onChange={(e) => setDestino(e.target.value)}>
                  <option value="Miami (MIA)">Miami (MIA)</option>
                  <option value="Nueva York (JFK)">Nueva York (JFK)</option>
                  <option value="Madrid (MAD)">Madrid (MAD)</option>
                </select>
              </div>
              <div className="col-md-12">
                <label className="form-label text-muted fw-bold">Fecha de Partida</label>
                <input type="date" className="form-control form-control-lg" />
              </div>
              <div className="col-12 mt-4">
                <button className="btn btn-primary btn-lg w-100 fw-bold shadow-sm" onClick={() => setVista('reserva')}>
                  Buscar Vuelos Disponibles
                </button>
              </div>
            </div>
          </div>
        )}

        {/* === VISTA 2: SELECCIÓN DE ASIENTO === */}
        {vista === 'reserva' && (
          <div className="premium-card p-4 p-md-5 fade-in">
            <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
              <h3 className="fw-bold m-0">Selección de Asiento</h3>
              <span className="badge bg-primary fs-6 px-3 py-2">PSA-772 ➔ {destino.split(' ')[0]}</span>
            </div>
            
            <div className="row g-5">
              <div className="col-md-6 text-center">
                <h5 className="text-muted fw-bold mb-4">Cabina Principal</h5>
                <div className="plane-container">
                  {filas.map((fila, index) => (
                    <div key={index} className="d-flex justify-content-between mb-3">
                      {fila.map(num => {
                        const ocupado = asientosOcupados.includes(num);
                        const seleccionado = asiento === num;
                        let clase = 'seat-available';
                        if (ocupado) clase = 'seat-occupied';
                        else if (seleccionado) clase = 'seat-selected';

                        return (
                          <div 
                            key={num}
                            onClick={() => !ocupado && setAsiento(num)}
                            className={`seat ${clase}`}
                          >
                            {num}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
                <div className="d-flex justify-content-center mt-4 gap-3 text-muted small fw-bold">
                  <div><span className="d-inline-block bg-secondary rounded-circle me-1" style={{width:'12px', height:'12px', opacity: 0.3}}></span> Disponible</div>
                  <div><span className="d-inline-block bg-primary rounded-circle me-1" style={{width:'12px', height:'12px'}}></span> Seleccionado</div>
                  <div><span className="d-inline-block bg-danger rounded-circle me-1" style={{width:'12px', height:'12px', opacity: 0.7}}></span> Ocupado</div>
                </div>
              </div>

              <div className="col-md-6">
                <h5 className="text-muted fw-bold mb-4">Detalles de la Reserva</h5>
                <div className="bg-light p-4 rounded-4 mb-4 border">
                  <div className="form-check form-switch mb-4">
                    <input className="form-check-input" type="checkbox" role="switch" id="corpSwitch" 
                           checked={esCorporativo} onChange={(e) => setEsCorporativo(e.target.checked)} />
                    <label className="form-check-label fw-bold" htmlFor="corpSwitch">Soy Cliente Corporativo</label>
                    <small className="d-block text-muted">Aplica descuento automático usando millas.</small>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-2 fs-5">
                    <span className="text-muted">Asiento:</span>
                    <strong className="text-primary">{asiento || 'Ninguno'}</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Tarifa Base:</span>
                    <strong>${precioBase.toFixed(2)}</strong>
                  </div>
                  {esCorporativo && (
                    <div className="d-flex justify-content-between mb-2 text-success">
                      <span>Descuento Millas:</span>
                      <strong>-${descuento.toFixed(2)}</strong>
                    </div>
                  )}
                  <hr/>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fs-5 fw-bold text-muted">Total:</span>
                    <span className="display-6 fw-bold text-dark">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="d-grid gap-3">
                  <button className="btn btn-primary btn-lg fw-bold shadow-sm" disabled={!asiento} onClick={() => setVista('pendiente')}>
                    Generar Reserva Provisional
                  </button>
                  <button className="btn btn-outline-secondary fw-bold" onClick={() => setVista('busqueda')}>
                    Volver a la búsqueda
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* === VISTA 3: RESERVA PENDIENTE (CORREO) === */}
        {vista === 'pendiente' && (
          <div className="premium-card p-5 text-center fade-in border-top border-warning border-5 mx-auto" style={{maxWidth: '700px'}}>
            <div className="mb-3" style={{fontSize: '4rem'}}>⏳</div>
            <h2 className="fw-bold">Reserva Pre-Aprobada</h2>
            <p className="text-muted fs-5">El asiento <strong className="text-dark">{asiento}</strong> está bloqueado a tu nombre.</p>
            
            <div className="email-mockup p-4 mt-5 text-start mx-auto">
              <div className="d-flex align-items-center mb-3 border-bottom pb-3">
                <div className="bg-primary rounded-circle p-3 me-3 text-white fs-4 d-flex align-items-center justify-content-center" style={{width: '50px', height: '50px'}}>✉️</div>
                <div>
                  <small className="text-primary fw-bold">Bandeja de Entrada</small>
                  <strong className="d-block fs-5">Acción Requerida: Paga tu vuelo PSA-772</strong>
                </div>
              </div>
              <p className="text-muted">Hola Cliente,</p>
              <p className="text-muted">Tu reserva (PNR-8842T) expirará pronto. Para confirmar tu lugar y emitir el pase de abordar, haz clic en el botón seguro de abajo.</p>
              <button className="btn btn-dark w-100 py-3 fw-bold mt-3 shadow" onClick={() => setVista('pago')}>
                💳 PAGAR AHORA (${total.toFixed(2)})
              </button>
            </div>
          </div>
        )}

        {/* === VISTA 4: PASARELA DE PAGO === */}
        {vista === 'pago' && (
          <div className="premium-card p-5 fade-in mx-auto" style={{maxWidth: '500px'}}>
            <div className="text-center mb-4">
              <h3 className="fw-bold">Pago Seguro</h3>
              <p className="text-muted">Monto a procesar: <strong className="text-dark">${total.toFixed(2)}</strong></p>
            </div>
            <div className="mb-4">
              <label className="form-label text-muted fw-bold small text-uppercase">Número de Tarjeta</label>
              <input type="text" className="form-control form-control-lg bg-light" placeholder="0000 0000 0000 0000" />
            </div>
            <div className="row mb-4">
              <div className="col-6">
                <label className="form-label text-muted fw-bold small text-uppercase">Vencimiento</label>
                <input type="text" className="form-control form-control-lg bg-light" placeholder="MM/YY" />
              </div>
              <div className="col-6">
                <label className="form-label text-muted fw-bold small text-uppercase">CVC</label>
                <input type="text" className="form-control form-control-lg bg-light" placeholder="123" />
              </div>
            </div>
            <button className="btn btn-success btn-lg w-100 fw-bold shadow-sm" onClick={() => setVista('exito')}>
              Confirmar y Pagar
            </button>
          </div>
        )}

        {/* === VISTA 5: ÉXITO === */}
        {vista === 'exito' && (
          <div className="premium-card p-5 text-center fade-in border-top border-success border-5 mx-auto" style={{maxWidth: '600px'}}>
            <div className="mb-3" style={{fontSize: '4rem'}}>✅</div>
            <h1 className="text-success fw-bold mb-4">¡Transacción Aprobada!</h1>
            <div className="bg-light p-4 rounded-4 mb-4 border">
              <p className="text-muted mb-1 text-uppercase fw-bold small">Estado Actual</p>
              <h4 className="fw-bold text-dark">Vuelo y Asiento ({asiento}) Habilitados</h4>
              <hr className="my-3"/>
              <p className="mb-0 text-muted">Localizador PNR: <strong className="text-dark fs-5">PSA-8842T</strong></p>
            </div>
            <p className="text-muted">Tu pase de abordar digital ya está disponible y se ha enviado la factura final a tu correo.</p>
            <button className="btn btn-outline-primary fw-bold mt-4 px-5 py-2" onClick={reiniciarFlujo}>
              Finalizar
            </button>
          </div>
        )}

      </div>
    </div>
  );
}