# Prompt Engineering & Context Engineering — Research

## Table of Contents

1. Introduction
2. Large Language Models (LLMs)
3. Prompt Engineering
4. RIO Methodology
5. Fundamental Prompt Engineering Patterns
6. Context Engineering
7. Research and Practical Experiments
   - Experiment 1: Hallucinations
   - Experiment 2: Zero-Shot vs Few-Shot
   - Experiment 3: Negative Constraints
8. Experimental Evaluation
9. General Findings
10. References

---

# 1. Introduction

Large Language Models have transformed how people interact with artificial intelligence. They can generate text, explain concepts, write code, summarize documents and assist with complex tasks.

However, the quality of their responses depends on several factors, including the instructions they receive and the information available to them.

This research explores three interconnected areas:

- **LLMs:** Understanding the technology behind language generation.
- **Prompt Engineering:** Designing effective instructions for LLMs.
- **Context Engineering:** Managing the information provided to LLMs.

It also investigates common limitations through practical experiments involving hallucinations, prompting techniques and negative constraints.

## Research Objectives

- Understand how LLMs process and generate language.
- Learn how to structure effective prompts.
- Present the RIO methodology.
- Explore fundamental prompting patterns.
- Understand Context Engineering and its components.
- Experiment with different prompting techniques.
- Evaluate the limitations and reliability of LLM responses.

---

# 2. Large Language Models (LLMs)

## 2.1 Definition

A Large Language Model (LLM) is an artificial intelligence model trained on massive datasets to understand and generate human-like language.

Most modern LLMs use deep learning architectures, particularly Transformer-based architectures.

Examples include:

- GPT by OpenAI.
- Claude by Anthropic.
- Gemini by Google.
- Llama by Meta.

## 2.2 How LLMs Work

LLMs process text through several stages.

### Step 1: Input

The user provides a prompt containing instructions, questions or information.

### Step 2: Tokenization

The input is divided into smaller units called tokens.

A token can represent a complete word, part of a word, punctuation or another text unit.

### Step 3: Embedding

Tokens are converted into numerical representations that the model can process.

### Step 4: Transformer Processing

Transformer layers analyze relationships between tokens using attention mechanisms.

Self-attention helps the model determine which parts of the input are relevant to one another.

### Step 5: Prediction

The model calculates probabilities for possible next tokens based on its learned parameters and current context.

### Step 6: Generation

The model generates tokens sequentially until the response is complete.

## 2.3 Important Concepts

| Concept        | Explanation                                      |
| -------------- | ------------------------------------------------ |
| Token          | Basic unit of text processing                    |
| Embedding      | Numerical representation of a token              |
| Transformer    | Neural network architecture                      |
| Attention      | Mechanism for identifying relevant relationships |
| Training       | Process of learning patterns from data           |
| Inference      | Process of generating responses                  |
| Context Window | Maximum information processed in an interaction  |

## 2.4 Limitations of LLMs

Despite their capabilities, LLMs have limitations:

- They can generate incorrect information.
- They may misunderstand ambiguous instructions.
- Their knowledge may be outdated.
- They can produce inconsistent responses.
- They may struggle with insufficient context.
- They do not automatically verify every generated claim.

These limitations make effective prompting and context management important.

---

# 3. Prompt Engineering

## 3.1 Definition

Prompt Engineering is the process of designing, structuring and refining instructions given to an LLM to obtain better responses.

A prompt is the input provided to the model to guide its behavior.

The objective is to reduce ambiguity, communicate requirements clearly and improve the relevance of generated outputs.

## 3.2 Elements of an Effective Prompt

### Role

Defines the expertise or perspective the model should adopt.

Example:

"Act as an experienced Laravel developer."

### Instruction

Defines the task the model must perform.

Example:

"Explain how Laravel migrations work."

### Context

Provides background information necessary to complete the task.

Example:

"The learner already understands PHP and basic database concepts."

### Constraints

Defines rules and restrictions.

Example:

"Do not introduce external packages."

### Output Format

Specifies how the response should be structured.

Example:

"Present the answer using a definition, code example and explanation."

## 3.3 Example of a Structured Prompt

```text
ROLE:
Act as an experienced PHP instructor.

TASK:
Explain PDO prepared statements.

CONTEXT:
The learner knows basic PHP and MySQL.

CONSTRAINTS:
- Use simple English.
- Include practical examples.
- Avoid unnecessary advanced concepts.

OUTPUT:
1. Definition
2. Explanation
3. PHP example
4. Explanation of the code
5. Common mistakes
```

A structured prompt makes the expected response clearer and easier to evaluate.

---

# 4. The RIO Methodology

## 4.1 Definition

RIO is a practical methodology for structuring prompts using three fundamental components:

- R — Role
- I — Instruction
- O — Output

It helps organize prompts into clear and understandable instructions.

## 4.2 Role

The Role defines the identity, expertise or perspective the model should adopt.

Example:

```text
Act as a senior PHP developer.
```

Purpose:

- Establishes the model's perspective.
- Guides the style of the response.
- Provides a relevant professional context.

## 4.3 Instruction

The Instruction describes the exact task that must be completed.

Example:

```text
Explain how PDO prepared statements work
and demonstrate how to use them with MySQL.
```

Purpose:

- Defines the objective.
- Reduces ambiguity.
- Communicates the expected action.

## 4.4 Output

The Output defines the expected structure and format.

Example:

```text
Present the response using:
- A short definition.
- A practical PHP example.
- An explanation of important lines.
- Common mistakes.
```

Purpose:

- Organizes the generated response.
- Improves readability.
- Makes results more consistent.

## 4.5 Complete RIO Example

```text
ROLE:
Act as an experienced PHP instructor.

INSTRUCTION:
Explain how PDO prepared statements work.

OUTPUT:
- Simple definition.
- PHP code example.
- Explanation of the code.
- Common mistakes.
```

## 4.6 Benefits and Limitations

**Benefits:**

- Easy to understand and apply.
- Makes prompts more structured.
- Reduces ambiguity.
- Helps standardize instructions.

**Limitations:**

- Does not guarantee factual accuracy.
- May not provide sufficient context for complex tasks.
- Does not replace validation or testing.
- May require additional constraints and examples.

RIO is a practical prompting framework, not a special feature built into LLMs.

---

# 5. Fundamental Prompt Engineering Patterns

Prompt patterns are reusable techniques for solving common problems when interacting with LLMs.

## 5.1 Zero-Shot Prompting

Zero-Shot prompting asks the model to perform a task without providing examples.

Example:

```text
Classify this sentence as Positive or Negative:

"The application is easy to use."
```

Advantages:

- Simple to implement.
- Short prompts.
- Requires no examples.
- Suitable for general tasks.

Limitations:

- May produce inconsistent results.
- Can struggle with specialized formats.
- Depends heavily on instruction clarity.

## 5.2 One-Shot Prompting

One-Shot prompting provides a single example to demonstrate the expected behavior.

Example:

```text
Example:
Input: "The service is excellent."
Output: Positive

Now classify:

Input: "The application is difficult."
Output:
```

The example helps the model understand the expected relationship between input and output.

## 5.3 Few-Shot Prompting

Few-Shot prompting provides multiple examples before asking the model to perform a task.

Example:

```text
Example 1:
Input: "Amazing experience."
Output: Positive

Example 2:
Input: "Terrible customer support."
Output: Negative

Example 3:
Input: "The application works perfectly."
Output: Positive

Now classify:

Input: "The software crashes frequently."
Output:
```

Advantages:

- Demonstrates expected patterns.
- Helps with specialized tasks.
- Can improve format consistency.
- Reduces the need for lengthy explanations.

Limitations:

- Increases prompt length.
- Requires representative examples.
- Poor examples can negatively influence results.

## 5.4 Zero-Shot vs One-Shot vs Few-Shot

| Criteria      | Zero-Shot     | One-Shot        | Few-Shot          |
| ------------- | ------------- | --------------- | ----------------- |
| Examples      | None          | One             | Several           |
| Prompt length | Short         | Medium          | Longer            |
| Setup         | Simple        | Simple          | Requires examples |
| Best use      | General tasks | Simple patterns | Specific patterns |

The best technique depends on the complexity of the task and the quality of available examples.

## 5.5 Chain-of-Thought Prompting

Chain-of-Thought prompting encourages the model to approach complex problems through intermediate reasoning steps.

Example:

```text
Solve this problem step by step.

A product costs $100.
It receives a 20% discount.

Calculate the final price.
```

A concise explanation could be:

1. Calculate the discount: $100 × 20% = $20.
2. Subtract the discount: $100 − $20 = $80.

Chain-of-Thought-style prompting can be useful for multi-step problems.

For applications, requesting a concise explanation or verifiable calculation is often preferable to requesting private internal reasoning.

## 5.6 Role Prompting

Role Prompting assigns the model a specific professional or functional role.

Example:

```text
Act as a senior Laravel developer.

Review the following controller and identify:
- Potential bugs.
- Security issues.
- Code quality problems.
```

Advantages:

- Establishes a relevant perspective.
- Helps guide terminology.
- Encourages task-specific responses.

However, assigning a role does not guarantee professional-level accuracy.

## 5.7 Task Decomposition

Task Decomposition divides complex tasks into smaller and more manageable subtasks.

Example:

```text
Build a task management application.

1. Analyze the requirements.
2. Design the database.
3. Create the models.
4. Implement controllers.
5. Develop the interface.
6. Test the application.
```

Advantages:

- Simplifies complex tasks.
- Makes progress easier to track.
- Helps isolate errors.
- Encourages organized implementation.

## 5.8 Output Formatting

Output Formatting specifies how the model should structure its response.

Example:

```text
Explain these HTTP status codes.

Return a Markdown table containing:
- Status code.
- Meaning.
- Typical use case.

Include:
200, 201, 400, 404 and 500.
```

Common output formats include:

- Markdown.
- Tables.
- JSON.
- Lists.
- Code blocks.
- Structured reports.

## 5.9 Iterative Prompting

Iterative Prompting improves an initial response through multiple interactions.

Process:

1. Write an initial prompt.
2. Evaluate the generated response.
3. Identify missing or incorrect elements.
4. Refine the prompt.
5. Generate a new response.
6. Compare the results.

Example:

Initial prompt:

```text
Explain Laravel middleware.
```

Refined prompt:

```text
Explain Laravel middleware to a beginner
who already knows PHP.

Include:
- A simple definition.
- A practical example.
- How middleware works in a request lifecycle.
- Common use cases.
```

This approach allows progressive improvement.

## 5.10 Negative Constraints

Negative Constraints specify what the model must avoid.

Example:

```text
Explain Laravel migrations.

Constraints:
- Do not use advanced terminology.
- Do not introduce unnecessary packages.
- Do not modify unrelated files.
- Do not assume the database is configured.
```

Advantages:

- Limits unwanted behavior.
- Helps enforce project requirements.
- Reduces unnecessary output.
- Makes restrictions explicit.

Limitations:

- Models may still violate restrictions.
- Vague restrictions can be misunderstood.
- Negative instructions alone do not fully describe the desired result.

**Best practice:** Combine negative constraints with positive instructions.

Example:

```text
Positive requirements:
- Use simple English.
- Include a practical example.

Negative constraints:
- Do not use advanced terminology.
- Do not introduce external packages.
```

---

# 6. Context Engineering

## 6.1 Definition

Context Engineering is the practice of collecting, organizing, selecting and managing information provided to an LLM to improve its ability to perform a task.

While Prompt Engineering focuses primarily on instructions, Context Engineering considers the broader information environment available to the model.

It includes instructions, user input, conversation history, external knowledge, memory and tools.

## 6.2 Prompt Engineering vs Context Engineering

| Prompt Engineering            | Context Engineering                           |
| ----------------------------- | --------------------------------------------- |
| Focuses on instructions       | Focuses on the entire information environment |
| Defines what to do            | Provides information needed to do it          |
| Optimizes prompt wording      | Optimizes information selection               |
| Usually works at prompt level | Works at system and application level         |

Prompt Engineering is one component of a broader Context Engineering strategy.

## 6.3 Main Components of Context Engineering

### System Instructions

Define the model's general behavior, responsibilities and rules.

Example:

```text
Always respond as a professional programming tutor.
Use clear explanations and practical examples.
```

### User Input

Contains the immediate task or question.

Example:

```text
Explain how Laravel middleware works.
```

### Conversation History

Provides relevant information from previous interactions.

Example:

The learner already understands PHP classes, methods and basic MVC architecture.

### Retrieval-Augmented Generation (RAG)

RAG retrieves relevant information from external sources and provides it to the model before generating a response.

Typical process:

1. Receive a question.
2. Search relevant documents.
3. Retrieve useful information.
4. Add retrieved content to the model's context.
5. Generate a response grounded in the retrieved information.

Example:

An AI assistant retrieves Laravel project documentation before answering a question about the application's architecture.

### Memory

Preserves useful information for future interactions.

Example:

Remembering a project's technology stack, architecture and coding conventions.

Memory and conversation history are related but different: history provides previous interaction content, while memory provides selected information intended for reuse.

### Tools

Allow an AI system to interact with external systems.

Examples:

- Search documentation.
- Read project files.
- Execute code.
- Run tests.
- Query databases.

## 6.4 Context Window

The Context Window is the maximum amount of information an LLM can process in a single interaction.

It is measured in tokens.

A context window can contain:

- System instructions.
- User prompts.
- Conversation history.
- Retrieved documents.
- Tool results.
- Other supporting information.

### Why Context Management Matters

Providing too much irrelevant information can reduce efficiency and make important details harder to prioritize.

Effective context management focuses on:

- Relevance.
- Accuracy.
- Organization.
- Recency.
- Information quality.
- Token limitations.

## 6.5 Context Engineering in Software Development

Consider an AI coding assistant receiving this instruction:

```text
Add a new feature to my Laravel application.
```

Without sufficient context, the assistant may not understand:

- Existing project structure.
- Database schema.
- Installed dependencies.
- Coding conventions.
- Existing implementations.
- Expected application behavior.

A more effective context would be:

```text
PROJECT:
Laravel task management application.

ARCHITECTURE:
MVC.

DATABASE:
MySQL.

CONVENTIONS:
- Follow existing naming conventions.
- Use Form Requests for validation.
- Keep business logic outside controllers.

TASK:
Implement a task filtering feature.

RESTRICTIONS:
- Do not modify unrelated features.
- Reuse existing models.
- Run relevant tests.
```

This provides the model with more relevant information before it performs the task.

## 6.6 Context Engineering Workflow

### 1. Collect

Gather relevant files, documentation and requirements.

### 2. Filter

Remove irrelevant or outdated information.

### 3. Organize

Structure the information into understandable sections.

### 4. Retrieve

Select information relevant to the current task.

### 5. Provide

Send the selected information to the LLM.

### 6. Execute

Generate the requested response or perform the task.

### 7. Validate

Check the generated result against the original requirements.

---

# 7. Research and Practical Experiments

This section documents three experiments designed to investigate LLM behavior and the effectiveness of different prompting techniques.

## Experimental Principles

To make comparisons meaningful:

- Use the same LLM for comparative tests.
- Keep the task identical.
- Change only the prompting technique being investigated.
- Record the exact prompts.
- Save actual model responses.
- Evaluate using consistent criteria.
- Repeat experiments when possible.

Important: Expected results are hypotheses, not experimental observations. Actual results must be recorded after running the tests.

---

# 7.1 Experiment 1 — Hallucinations

## Objective

Investigate whether an LLM can generate false or fabricated information while presenting it confidently.

## Background

A hallucination occurs when an LLM generates information that is false, fabricated or unsupported by reliable evidence.

Hallucinations may include:

- Invented people.
- Fake historical events.
- Nonexistent references.
- Incorrect technical information.
- Fabricated citations.

## Hypothesis

A prompt containing a false premise may encourage the model to generate fabricated details.

Adding instructions to verify information and acknowledge uncertainty may reduce this behavior.

## Methodology

Conduct two tests using the same model.

### Test A — False Premise

Prompt:

```text
Who invented the fictional programming language
called Xylora in 1987?

Give me the inventor's name, biography,
and three major achievements.
```

### Test B — Verification Instruction

Prompt:

```text
Is Xylora a real programming language?

If you cannot verify its existence,
say that you do not have sufficient information.

Do not invent an answer.
```

## Observation Criteria

- Does the model invent an inventor?
- Does it generate fabricated historical details?
- Does it recognize that the premise may be false?
- Does the verification instruction change the response?

## Results Documentation

| Criteria                     | Test A        | Test B        |
| ---------------------------- | ------------- | ------------- |
| Invented information         | Record result | Record result |
| Recognition of false premise | Record result | Record result |
| Uncertainty expressed        | Record result | Record result |
| Overall reliability          | Evaluate      | Evaluate      |

## Analysis

The first prompt assumes that Xylora exists and was invented in 1987.

This can encourage the model to accept the premise and generate a plausible answer instead of questioning it.

The second prompt explicitly encourages verification and uncertainty.

However, asking the model not to hallucinate does not guarantee that the response will be accurate.

## Conclusion

LLMs can generate convincing but incorrect information.

To reduce hallucinations:

- Verify important claims.
- Provide reliable sources.
- Use RAG when appropriate.
- Encourage uncertainty when evidence is missing.
- Avoid treating confidence as proof of accuracy.

---

# 7.2 Experiment 2 — Zero-Shot vs Few-Shot

## Objective

Compare the effectiveness of Zero-Shot and Few-Shot prompting in a customer review classification task.

## Background

Zero-Shot prompting provides instructions without examples.

Few-Shot prompting provides examples demonstrating the expected behavior.

## Hypothesis

Few-Shot prompting may improve consistency when the task requires a specific classification pattern.

## Methodology

Use the same classification task and compare two prompts.

### Test A — Zero-Shot

Prompt:

```text
Classify the following customer review
as Positive or Negative.

"The application is very slow
and crashes frequently."
```

### Test B — Few-Shot

Prompt:

```text
Examples:

"Excellent application." → Positive

"Terrible performance." → Negative

"Very easy to use." → Positive

Now classify:

"The application is very slow
and crashes frequently."
```

## Expected Classification

Negative.

## Evaluation Criteria

1. Classification accuracy.
2. Compliance with the expected output.
3. Consistency across repeated runs.
4. Response quality.
5. Prompt length.

## Results Documentation

| Criteria               | Zero-Shot     | Few-Shot      |
| ---------------------- | ------------- | ------------- |
| Correct classification | Record result | Record result |
| Output format          | Record result | Record result |
| Consistency            | Evaluate      | Evaluate      |
| Prompt length          | Short         | Longer        |

## Analysis

Both approaches may correctly classify the review.

However, Few-Shot provides examples that demonstrate how the classification task should be performed.

This can be especially useful when a task involves specific conventions that are difficult to communicate through instructions alone.

## Conclusion

Zero-Shot is suitable for straightforward tasks that can be described clearly.

Few-Shot is useful when examples help communicate expected patterns and output formats.

Neither method is universally superior. Performance depends on the task, model and examples.

---

# 7.3 Experiment 3 — Negative Constraints

## Objective

Investigate whether explicitly defining restrictions improves an LLM's compliance with requirements.

## Background

Negative constraints specify what the model must avoid.

They are commonly used in coding tasks, content generation and structured outputs.

## Hypothesis

Adding negative constraints may reduce unwanted output.

Combining positive requirements with negative constraints should provide clearer guidance.

## Methodology

Use the same PHP programming task with three prompts.

### Test A — Without Constraints

```text
Write a PHP function that validates
an email address.
```

### Test B — Negative Constraints

```text
Write a PHP function that validates
an email address.

Constraints:
- Do not use external libraries.
- Do not create additional classes.
- Do not use unnecessary complexity.
- Do not include HTML.
```

### Test C — Positive and Negative Constraints

```text
Write a PHP function that validates
an email address.

Requirements:
- Use PHP's built-in filter_var().
- Return true for valid addresses.
- Return false for invalid addresses.
- Keep the function simple.

Restrictions:
- Do not use external libraries.
- Do not create additional classes.
- Do not include HTML.
```

## Evaluation Criteria

- Compliance with requirements.
- Compliance with restrictions.
- Unnecessary dependencies.
- Code complexity.
- Correctness of generated PHP code.

## Results Documentation

| Criteria               | Test A   | Test B   | Test C   |
| ---------------------- | -------- | -------- | -------- |
| Uses filter_var()      | Evaluate | Evaluate | Check    |
| External libraries     | Evaluate | Check    | Check    |
| Additional classes     | Evaluate | Check    | Check    |
| Simple implementation  | Evaluate | Evaluate | Evaluate |
| Functional correctness | Test     | Test     | Test     |

## Analysis

Test A provides minimal guidance.

Test B defines what the model should avoid but does not fully specify the desired implementation.

Test C communicates both the expected implementation and its restrictions.

This distinction is important because telling a model what not to do does not always explain what it should do instead.

## Conclusion

Negative constraints are useful for reducing unwanted behavior.

However, combining positive requirements with negative constraints generally provides clearer instructions and makes the output easier to evaluate.

---

# 8. Experimental Evaluation

## 8.1 Standard Documentation Structure

Each experiment should include the following sections:

| Section     | Description                          |
| ----------- | ------------------------------------ |
| Objective   | What are we investigating?           |
| Hypothesis  | What do we expect?                   |
| Methodology | How was the experiment conducted?    |
| Prompt      | Exact instruction given to the model |
| Observation | Actual generated response            |
| Analysis    | Explanation of the observed behavior |
| Conclusion  | What did the experiment demonstrate? |

## 8.2 Fair Comparison

For reliable comparisons:

1. Use the same model and configuration.
2. Keep the task identical.
3. Change only the variable being tested.
4. Use the same evaluation criteria.
5. Repeat tests when possible.
6. Save the exact prompts and responses.

## 8.3 Limitations of the Experiments

The experiments provide practical observations, not universal scientific proof.

Results may vary depending on:

- Model architecture.
- Model version.
- System instructions.
- Sampling parameters.
- Prompt wording.
- Available context.
- Number of repetitions.

A single successful or unsuccessful response cannot establish that one prompting technique is always better.

---

# 9. General Findings

The research highlights several important findings.

## Finding 1 — LLMs Are Not Automatically Reliable

They can produce convincing but incorrect information. Important claims require verification.

## Finding 2 — Structured Prompts Improve Clarity

Frameworks such as RIO help organize instructions and reduce ambiguity.

## Finding 3 — Prompting Techniques Serve Different Purposes

Zero-Shot, Few-Shot, Role Prompting and Task Decomposition address different needs.

## Finding 4 — Context Matters

Relevant project information, documentation and conversation history help models generate more useful responses.

## Finding 5 — Constraints Need Clear Requirements

Negative constraints are more effective when accompanied by positive instructions.

## Finding 6 — Validation Remains Essential

Generated responses and code must be checked against the original requirements.

---

# 10. Final Conclusion

Large Language Models provide powerful capabilities for generating and processing information, but their effectiveness depends on how they are instructed and what information they receive.

Prompt Engineering provides techniques for designing effective instructions.

The RIO methodology offers a simple structure based on Role, Instruction and Output.

Fundamental prompting patterns provide reusable approaches for different tasks.

Context Engineering expands this approach by managing the information environment available to the model.

Finally, practical experiments demonstrate the importance of evaluating hallucinations, comparing prompting techniques and testing instruction compliance.

**The central principle:**

Better instructions + Relevant context + Continuous validation = More reliable AI interactions.

---

# 11. References

## Official Documentation

1. OpenAI — Prompt Engineering Guide  
   https://platform.openai.com/docs/guides/prompt-engineering

2. Anthropic — Prompt Engineering Documentation  
   https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview

3. Google — Prompt Design Strategies  
   https://ai.google.dev/gemini-api/docs/prompting-strategies

## Academic Research

4. Lewis et al. (2020) — Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks.  
   https://arxiv.org/abs/2005.11401

5. Ji et al. (2022) — Survey of Hallucination in Natural Language Generation.  
   https://arxiv.org/abs/2202.03629

6. Brown et al. (2020) — Language Models are Few-Shot Learners.  
   https://arxiv.org/abs/2005.14165
