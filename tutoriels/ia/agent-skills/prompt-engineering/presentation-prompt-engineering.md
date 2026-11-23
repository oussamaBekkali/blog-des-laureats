---
marp: true
theme: default
paginate: true
size: 16:9
style: |
  section {
    font-family: Arial, sans-serif;
    padding: 50px;
    font-size: 24px;
  }
  h1, h2 {
    color: #2563eb;
  }
---

<!-- _class: lead -->

# LLMs & Prompt Engineering

### Understanding, Structuring and Optimizing AI Interactions

---

# Presentation Plan

1. Introduction to LLMs
2. Prompt Engineering & RIO
3. Fundamental Prompting Patterns
4. Context Engineering
5. Research & Experiments
6. Conclusion

---

# 01 — Large Language Models

## What is an LLM?

A Large Language Model is an AI model trained on large amounts of text to understand and generate human-like language.

**Key characteristics:**

- Based on deep learning.
- Uses Transformer architectures.
- Processes information through tokens.
- Predicts and generates text.

**Examples:** GPT, Claude, Gemini and Llama.

<!-- IMAGE PLACEHOLDER: LLM architecture -->
<!-- images/llm-architecture.png -->

---

# How LLMs Work

1. Input
2. Tokenization
3. Embedding
4. Transformer processing
5. Next-token prediction
6. Response generation

**Important:** LLMs generate statistically likely responses; they do not automatically guarantee factual accuracy.

---

# 02 — Prompt Engineering

## Definition

Prompt Engineering is the practice of designing and optimizing instructions to obtain relevant, accurate and structured LLM responses.

**Elements of an effective prompt:**

- Role
- Instruction
- Context
- Constraints
- Output format

---

# The RIO Methodology

| Component | Meaning     | Purpose                    |
| --------- | ----------- | -------------------------- |
| R         | Role        | Define AI expertise        |
| I         | Instruction | Explain the task           |
| O         | Output      | Define the expected format |

<!-- IMAGE PLACEHOLDER: RIO methodology diagram -->
<!-- images/rio-methodology.png -->

**Example:**

- Role: Act as a PHP instructor.
- Instruction: Explain PDO prepared statements.
- Output: Definition, code example and explanation.

---

# 03 — Fundamental Prompting Patterns

| Pattern              | Purpose                         |
| -------------------- | ------------------------------- |
| Zero-Shot            | Perform a task without examples |
| One-Shot             | Provide one example             |
| Few-Shot             | Provide multiple examples       |
| Chain-of-Thought     | Request structured explanations |
| Role Prompting       | Assign a specific role          |
| Task Decomposition   | Divide complex tasks            |
| Output Formatting    | Structure responses             |
| Iterative Prompting  | Refine responses                |
| Negative Constraints | Define what to avoid            |

<!-- IMAGE PLACEHOLDER: Prompt engineering patterns diagram -->
<!-- images/prompting-patterns.png -->

---

# Zero-Shot vs Few-Shot

**Zero-Shot:** Instructions without examples.

**Few-Shot:** Instructions accompanied by examples.

| Criteria      | Zero-Shot     | Few-Shot          |
| ------------- | ------------- | ----------------- |
| Examples      | None          | Several           |
| Prompt length | Short         | Longer            |
| Setup         | Simple        | Requires examples |
| Best use      | General tasks | Specific patterns |

---

# 04 — Context Engineering

## Definition

Context Engineering is the practice of collecting, organizing and managing the information provided to an LLM.

**Main components:**

- System instructions
- User input
- Conversation history
- External knowledge (RAG)
- Memory
- Tools

<!-- IMAGE PLACEHOLDER: Context engineering architecture -->
<!-- images/context-engineering.png -->

---

# Context Engineering Workflow

1. Collect relevant information.
2. Filter irrelevant content.
3. Organize the context.
4. Retrieve relevant information.
5. Provide context to the LLM.
6. Execute the task.
7. Validate the result.

**Key concept:** Context Window — the maximum amount of information a model can process in one interaction.

---

# 05 — Research & Experiments

## Three Practical Experiments

**Experiment 1: Hallucinations**

Can an LLM generate convincing but fabricated information?

**Experiment 2: Zero-Shot vs Few-Shot**

Does providing examples improve task performance?

**Experiment 3: Negative Constraints**

Do explicit restrictions improve instruction compliance?

---

# Experiment 1 — Hallucinations

**Objective:** Observe how an LLM handles false or unverifiable information.

**Method:**

- Ask about a fictional programming language.
- Observe whether the model invents information.
- Repeat with explicit verification instructions.

**Key finding:** Clear verification instructions can help reduce unsupported claims, but do not guarantee accuracy.

---

# Experiment 2 — Zero-Shot vs Few-Shot

**Objective:** Compare two prompting techniques using customer review classification.

**Method:**

- Test classification without examples.
- Test classification with several examples.
- Compare accuracy and format consistency.

**Key finding:** Few-Shot can improve consistency when examples communicate specific requirements.

---

# Experiment 3 — Negative Constraints

**Objective:** Evaluate the effect of explicit restrictions.

**Method:**

- Generate PHP code without constraints.
- Add negative constraints.
- Combine positive requirements with negative constraints.
- Compare the generated code.

**Key finding:** Explicit positive requirements combined with restrictions provide clearer guidance.

---

# Experimental Methodology

Every experiment should document:

- Objective
- Hypothesis
- Methodology
- Exact prompt
- Actual observations
- Analysis
- Conclusion

**Best practices:**

- Keep the model consistent.
- Change one variable at a time.
- Record actual outputs.
- Use identical evaluation criteria.

---

# 06 — Final Synthesis

<!-- IMAGE PLACEHOLDER: LLM to reliable AI workflow -->
<!-- images/final-synthesis.png -->

**LLMs**

↓

**Prompt Engineering**

↓

**Context Engineering**

↓

**Experimentation & Validation**

↓

**Better AI Interactions**

---

<!-- _class: lead -->

# Conclusion

**Prompt Engineering** improves how we communicate with LLMs.

**Context Engineering** improves the information available to them.

**Experimentation** helps us evaluate their capabilities and limitations.

### Better Instructions + Better Context + Validation

---

# References

- OpenAI — Prompt Engineering Documentation
- Anthropic — Prompt Engineering Documentation
- Google — Prompt Design Strategies
- Lewis et al. — Retrieval-Augmented Generation (2020)
- Ji et al. — Survey of Hallucination in Natural Language Generation (2022)

---

<!-- _class: lead -->

# Thank You

### Questions & Discussion
