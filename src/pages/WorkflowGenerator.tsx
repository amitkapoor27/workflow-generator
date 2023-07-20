import React, { useState } from 'react';
import { Container, Typography, Button, TextField, Grid, Box, Paper, TextareaAutosize } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Textarea from '../components/Textarea';

interface Step {
  id: number;
  title: string;
  content: string;
  options: string[];
  statement: string;
}

const WorkflowGenerator: React.FC = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);
const [generatedJSON, setGeneratedJSON] = useState<string>('');

  const handleAddStep = () => {
    const newStep: Step = {
      id: steps.length + 1,
      title: `Step ${steps.length + 1}`,
      content: '',
      options: [],
      statement: '',
    };
    setSteps([...steps, newStep]);
  };

  const handleDeleteStep = (stepId: number) => {
    setSteps(steps.filter((step) => step.id !== stepId));
  };

  const handleGenerateJSON = () => {
    const jsonData = JSON.stringify(steps, null, 2);
    console.log(jsonData);
	setGeneratedJSON(jsonData);
  };
const handleCopyJSON = () => {
    navigator.clipboard.writeText(generatedJSON);
  };
  const handleOptionChange = (stepId: number, optionIndex: number, value: string) => {
    setSteps(steps.map((step) =>
      step.id === stepId ? { ...step, options: [...step.options.slice(0, optionIndex), value, ...step.options.slice(optionIndex + 1)] } : step
    ));
  };

  const handleStatementChange = (stepId: number, value: string) => {
    setSteps(steps.map((step) =>
      step.id === stepId ? { ...step, statement: value } : step
    ));
  };

  return (
    <Container>
      <Box mt={3}>
        <Typography variant="h4" gutterBottom>
          Workflow Generator
        </Typography>
        {steps.map((step) => (
          <Paper key={step.id} elevation={3} variant="outlined" sx={{ p: 3, mt: 3 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  {step.title}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Content"
                  multiline
                  rows={4}
                  fullWidth
                  value={step.content}
                  onChange={(e) =>
                    setSteps(
                      steps.map((s) =>
                        s.id === step.id ? { ...s, content: e.target.value } : s
                      )
                    )
                  }
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Statement"
                  fullWidth
                  value={step.statement}
                  onChange={(e) => handleStatementChange(step.id, e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                {step.options.map((option, index) => (
                  <Box key={index} display="flex" alignItems="center" mt={2}>
                    <TextField
                      label={`Option ${index + 1}`}
                      fullWidth
                      value={option}
                      onChange={(e) => handleOptionChange(step.id, index, e.target.value)}
                      variant="outlined"
                    />
                    <Button
                      color="error"
                      variant="outlined"
                      onClick={() => setSteps(steps.map((s) => s.id === step.id ? { ...s, options: s.options.filter((_, i) => i !== index) } : s))}
                      sx={{ ml: 2 }}
                    >
                      <DeleteIcon />
                    </Button>
                  </Box>
                ))}
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => setSteps(steps.map((s) => s.id === step.id ? { ...s, options: [...s.options, ''] } : s))}
                >
                  Add Option
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteStep(step.id)}
                >
                  Delete Step
                </Button>
              </Grid>
            </Grid>
          </Paper>
        ))}
        <Box mt={3} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={handleAddStep}>
            Add Step
          </Button>
          <Button variant="contained" color="secondary" onClick={handleGenerateJSON}>
            Generate JSON
          </Button>
        </Box>
	
      
       {generatedJSON && (
          <Box mt={3}>
            <Typography variant="h6">Generated JSON:</Typography>
            <Textarea
              
              textvalue={generatedJSON}
              
            />
            <Button variant="outlined" color="primary" onClick={handleCopyJSON} sx={{ mt: 2 }}>
              Copy JSON
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default WorkflowGenerator;
