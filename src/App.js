import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Row, Col, Card, Button, Form, Alert, Spinner, Badge } from 'react-bootstrap';
import { analyzeImage } from './services/groqService';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [analysisResult, setAnalysisResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setError('');
      setAnalysisResult('');
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError('');
    setAnalysisResult('');

    try {
      const result = await analyzeImage(selectedImage);
      setAnalysisResult(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setAnalysisResult('');
    setError('');
    document.getElementById('file-input').value = '';
  };

  return (
    <div className="App bg-gradient-primary min-vh-100">
      <Container fluid className="py-4">
        <Row className="justify-content-center">
          <Col lg={10} xl={8}>
            <Card className="shadow-lg border-0 bg-white bg-opacity-95">
              <Card.Header className="bg-primary text-white text-center py-3">
                <h2 className="mb-1">
                  <i className="fas fa-eye me-2"></i>
                  Arjun Image Analysis
                </h2>
                <p className="mb-0 opacity-75">Upload an image to analyze its contents using AI</p>
              </Card.Header>
              
              <Card.Body className="p-4">
                <Row>
                  <Col md={6}>
                    <Card className="h-100 border-dashed">
                      <Card.Body className="d-flex flex-column">
                        <h5 className="card-title text-muted mb-3">
                          <i className="fas fa-upload me-2"></i>
                          Upload Image
                        </h5>
                        
                        <Form.Group className="mb-3">
                          <Form.Control
                            id="file-input"
                            type="file"
                            accept="image/*"
                            onChange={handleImageSelect}
                            className="d-none"
                          />
                          <div className="upload-area flex-grow-1 d-flex flex-column justify-content-center align-items-center" 
                               onClick={() => document.getElementById('file-input').click()}
                               style={{ cursor: 'pointer', minHeight: '200px' }}>
                            {imagePreview ? (
                              <img src={imagePreview} alt="Selected" className="img-fluid rounded shadow-sm" style={{ maxHeight: '180px' }} />
                            ) : (
                              <>
                                <i className="fas fa-cloud-upload-alt fa-3x text-muted mb-3"></i>
                                <p className="text-muted mb-0">Click to select an image</p>
                                <small className="text-muted">Supports JPG, PNG, GIF</small>
                              </>
                            )}
                          </div>
                        </Form.Group>
                        
                        {selectedImage && (
                          <>
                            <div className="mb-3">
                              <Badge bg="secondary" className="me-2">
                                <i className="fas fa-file me-1"></i>
                                {selectedImage.name}
                              </Badge>
                              <Badge bg="info">
                                {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
                              </Badge>
                            </div>
                            
                            <div className="d-grid gap-2">
                              <Button 
                                variant="primary" 
                                onClick={handleAnalyze} 
                                disabled={loading}
                                size="lg"
                              >
                                {loading ? (
                                  <>
                                    <Spinner animation="border" size="sm" className="me-2" />
                                    Analyzing...
                                  </>
                                ) : (
                                  <>
                                    <i className="fas fa-brain me-2"></i>
                                    Analyze Image
                                  </>
                                )}
                              </Button>
                              <Button variant="outline-secondary" onClick={handleReset}>
                                <i className="fas fa-redo me-2"></i>
                                Reset
                              </Button>
                            </div>
                          </>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                  
                  <Col md={6}>
                    <Card className="h-100">
                      <Card.Body>
                        <h5 className="card-title text-muted mb-3">
                          <i className="fas fa-search me-2"></i>
                          Analysis Results
                        </h5>
                        
                        {loading && (
                          <div className="text-center py-5">
                            <Spinner animation="border" variant="primary" className="mb-3" />
                            <p className="text-muted">Analyzing your image...</p>
                            <div className="progress" style={{ height: '4px' }}>
                              <div className="progress-bar progress-bar-striped progress-bar-animated" 
                                   style={{ width: '100%' }}></div>
                            </div>
                          </div>
                        )}
                        
                        {error && (
                          <Alert variant="danger" className="d-flex align-items-center">
                            <i className="fas fa-exclamation-triangle me-2"></i>
                            {error}
                          </Alert>
                        )}
                        
                        {analysisResult && !loading && (
                          <div className="result-container">
                            <Alert variant="success" className="d-flex align-items-center mb-3">
                              <i className="fas fa-check-circle me-2"></i>
                              Analysis completed successfully!
                            </Alert>
                            <div className="result-text bg-light p-3 rounded border" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                              <ReactMarkdown>{analysisResult}</ReactMarkdown>
                            </div>
                          </div>
                        )}
                        
                        {!selectedImage && !loading && !analysisResult && (
                          <div className="text-center py-5 text-muted">
                            <i className="fas fa-image fa-3x mb-3 opacity-50"></i>
                            <p>Select an image to see analysis results here</p>
                          </div>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;