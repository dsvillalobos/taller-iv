import { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Badge,
  Button,
  ListGroup,
  ListGroupItem,
  Spinner,
  Alert,
} from "reactstrap";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Dirección de tu API Express
const API_URL = "http://localhost:3000";

function App() {
  const [health, setHealth] = useState(null);
  const [integrantes, setIntegrantes] = useState([]);

  const [loadingHealth, setLoadingHealth] = useState(true);
  const [loadingInfo, setLoadingInfo] = useState(true);

  const [errorHealth, setErrorHealth] = useState("");
  const [errorInfo, setErrorInfo] = useState("");

  useEffect(() => {
    // Consumir el endpoint /api/health
    axios
      .get(`${API_URL}/api/health`)
      .then((response) => {
        setHealth(response.data);
      })
      .catch((error) => {
        console.error("Error al consultar el estado:", error);
        setErrorHealth(
          "No se pudo conectar con el servidor. Verifica que la API esté funcionando.",
        );
      })
      .finally(() => {
        setLoadingHealth(false);
      });

    // Consumir el endpoint /api/info
    axios
      .get(`${API_URL}/api/info`)
      .then((response) => {
        setIntegrantes(response.data.integrantes);
      })
      .catch((error) => {
        console.error("Error al obtener los integrantes:", error);
        setErrorInfo("No se pudo cargar la información de los integrantes.");
      })
      .finally(() => {
        setLoadingInfo(false);
      });
  }, []);

  return (
    <div className="app">
      {/* ENCABEZADO */}
      <header className="hero">
        <Container>
          <nav className="navbar-custom">
            <div className="brand">
              <span className="brand-icon">T4</span>
              <span>Taller IV</span>
            </div>

            <Badge color="light" pill className="course-badge">
              Proyecto académico
            </Badge>
          </nav>

          <Row className="align-items-center hero-content">
            <Col lg="8">
              <p className="eyebrow">DESARROLLO WEB</p>

              <h1>
                Bienvenido a <span>Taller IV.</span>
              </h1>

              <p className="hero-description">
                Una interfaz para presentar el estado del sistema y la
                información de nuestro equipo de desarrollo.
              </p>

              <Button color="light" className="hero-button" href="#integrantes">
                Conocer al equipo →
              </Button>
            </Col>

            <Col lg="4" className="hero-visual">
              <div className="orbit orbit-one"></div>
              <div className="orbit orbit-two"></div>
              <div className="hero-symbol">&lt;/&gt;</div>
              <span className="floating-tag">React + Reactstrap</span>
            </Col>
          </Row>
        </Container>
      </header>

      <main>
        <Container className="main-content">
          {/* ESTADO REAL DEL API */}
          <section className="health-section">
            <div className="section-heading">
              <div>
                <p className="eyebrow">MONITOREO DEL SISTEMA</p>
                <h2>Estado de la aplicación</h2>
              </div>

              {!loadingHealth && (
                <Badge
                  color={health ? "success" : "danger"}
                  pill
                  className="status-badge"
                >
                  {health ? "● Conectado" : "● Sin conexión"}
                </Badge>
              )}
            </div>

            <div className="health-panel">
              <div className="health-icon">
                {loadingHealth ? <Spinner size="sm" /> : health ? "✓" : "!"}
              </div>

              <div className="health-text">
                <h4>Estado del API</h4>

                {loadingHealth ? (
                  <p>Cargando estado del servidor...</p>
                ) : errorHealth ? (
                  <p className="text-danger">{errorHealth}</p>
                ) : (
                  <p>{health.message}</p>
                )}

                <span className="health-caption">
                  Endpoint: GET /api/health
                </span>
              </div>
            </div>
          </section>

          {/* INFORMACIÓN DE LOS INTEGRANTES */}
          <section id="integrantes" className="team-section">
            <div className="section-heading">
              <div>
                <p className="eyebrow">NUESTRO EQUIPO</p>
                <h2>Información de los integrantes</h2>

                <p className="section-description">
                  Datos académicos obtenidos directamente desde el API.
                </p>
              </div>

              {!loadingInfo && !errorInfo && (
                <Badge color="primary" pill className="team-badge">
                  {integrantes.length} integrantes
                </Badge>
              )}
            </div>

            {loadingInfo && (
              <div className="text-center py-5">
                <Spinner color="primary" />
                <p className="mt-3">Cargando integrantes...</p>
              </div>
            )}

            {errorInfo && <Alert color="danger">{errorInfo}</Alert>}

            {!loadingInfo && !errorInfo && integrantes.length === 0 && (
              <Alert color="info">No hay integrantes disponibles.</Alert>
            )}

            {!loadingInfo && !errorInfo && integrantes.length > 0 && (
              <Row>
                {integrantes.map((persona, index) => (
                  <Col md="6" lg="4" className="mb-4" key={persona.nombre}>
                    <Card className="member-card h-100">
                      <CardBody>
                        <div className={`avatar avatar-${(index % 3) + 1}`}>
                          {persona.nombre
                            .split(" ")
                            .map((palabra) => palabra[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()}
                        </div>

                        <h3 className="member-name">{persona.nombre}</h3>

                        <p className="member-role">Estudiante universitario</p>

                        <div className="member-divider"></div>

                        <ListGroup flush>
                          <ListGroupItem>
                            <span className="detail-label">Edad</span>
                            <strong>{persona.edad} años</strong>
                          </ListGroupItem>

                          <ListGroupItem>
                            <span className="detail-label">Carrera</span>
                            <strong className="career-value">
                              {persona.carrera}
                            </strong>
                          </ListGroupItem>

                          <ListGroupItem>
                            <span className="detail-label">
                              Materias aprobadas
                            </span>
                            <strong>{persona.materiasAprobadas}</strong>
                          </ListGroupItem>
                        </ListGroup>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </section>
        </Container>
      </main>

      <footer className="footer">
        <Container>
          <div className="footer-content">
            <span>© 2026 Taller IV</span>
            <span>Desarrollado con React, Axios y Reactstrap</span>
          </div>
        </Container>
      </footer>
    </div>
  );
}

export default App;
