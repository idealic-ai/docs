export const questions = {
  "Q1": {
    "schema": {
      "type": "object",
      "description": "Question: What are the two primary determinism spectra?",
      "properties": {
        "answer": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "Structural Determinism governs blueprint rigidity (process/schema flexibility vs. rigidity)",
              "Content Determinism governs output certainty (variety vs. predictability)",
              "Both spectra primarily deal with LLM temperature settings",
              "They form a 2D control space for system behavior",
              "They are mutually exclusive - you can only control one at a time",
              "Different task types occupy different regions in this 2D space"
            ]
          }
        },
        "interpretation": {
          "description": "Clarify your understanding of what the question is asking by briefly explaining each term used in the question. Avoid discussing the options - that is for breakdown.",
          "type": "string"
        },
        "reasoning": {
          "description": "Provide your thought process and rationale while answering the question.",
          "type": "string"
        },
        "breakdown": {
          "description": "Detail the reasoning for each option, explaining why it is correct or incorrect.",
          "type": "string"
        },
        "confusion": {
          "description": "What is the source of your confusion?",
          "type": "string"
        },
        "suggestions": {
          "description": "What would you suggest to improve the question or in the chapter wrt to this question?",
          "type": "string"
        }
      },
      "required": [
        "answer",
        "reasoning",
        "interpretation",
        "breakdown",
        "confusion",
        "suggestions"
      ]
    },
    "correctAnswers": [
      "Structural Determinism governs blueprint rigidity (process/schema flexibility vs. rigidity)",
      "Content Determinism governs output certainty (variety vs. predictability)",
      "They form a 2D control space for system behavior",
      "Different task types occupy different regions in this 2D space"
    ]
  },
  "Q2": {
    "schema": {
      "type": "object",
      "description": "Question: How do the determinism levers relate to the two spectra of determinism?",
      "properties": {
        "answer": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "Temperature control primarily affects Content Determinism.",
              "Clear instructions on output JSON structure increase Structural Determinism.",
              "Data quality and examples only influence Content Determinism.",
              "Validation gates enforcing schema adherence contribute to Structural Determinism.",
              "Programmatic replacement maximizes both Structural and Content Determinism.",
              "Process structure (e.g., fixed workflows) mainly impacts Content Determinism.",
              "Instructions about desired tone or style in the output affect Content Determinism.",
              "Semantic validation (e.g., factual accuracy checks) enhances Content Determinism.",
              "All levers affect both spectra equally and in the same way.",
              "Data examples showing desired output style guide Content Determinism."
            ]
          }
        },
        "interpretation": {
          "description": "Clarify your understanding of what the question is asking by briefly explaining each term used in the question. Avoid discussing the options - that is for breakdown.",
          "type": "string"
        },
        "reasoning": {
          "description": "Provide your thought process and rationale while answering the question.",
          "type": "string"
        },
        "breakdown": {
          "description": "Detail the reasoning for each option, explaining why it is correct or incorrect.",
          "type": "string"
        },
        "confusion": {
          "description": "What is the source of your confusion?",
          "type": "string"
        },
        "suggestions": {
          "description": "What would you suggest to improve the question or in the chapter wrt to this question?",
          "type": "string"
        }
      },
      "required": [
        "answer",
        "reasoning",
        "interpretation",
        "breakdown",
        "confusion",
        "suggestions"
      ]
    },
    "correctAnswers": [
      "Temperature control primarily affects Content Determinism.",
      "Clear instructions on output JSON structure increase Structural Determinism.",
      "Validation gates enforcing schema adherence contribute to Structural Determinism.",
      "Programmatic replacement maximizes both Structural and Content Determinism.",
      "Instructions about desired tone or style in the output affect Content Determinism.",
      "Semantic validation (e.g., factual accuracy checks) enhances Content Determinism.",
      "Data examples showing desired output style guide Content Determinism."
    ]
  },
  "Q3": {
    "schema": {
      "type": "object",
      "description": "Question: Which statements accurately describe temperature control's role in determinism?",
      "properties": {
        "answer": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "It is a primary lever for controlling Content Determinism.",
              "It directly modifies the structural rigidity of a process.",
              "Dynamic temperature adjustment allows varying Content Determinism during a single execution.",
              "Temperature segmentation applies different settings to parts of a task for varied Content Determinism.",
              "Optimal temperature is the same for all models and tasks.",
              "Lower temperatures generally lead to less varied and more predictable content.",
              "Higher temperatures are suitable for exploratory content generation.",
              "Temperature calibration is unnecessary if dynamic adjustment is used.",
              "Near-zero temperature aims for maximum content certainty in LLM outputs.",
              "Temperature control has no impact if strong validation gates are in place."
            ]
          }
        },
        "interpretation": {
          "description": "Clarify your understanding of what the question is asking by briefly explaining each term used in the question. Avoid discussing the options - that is for breakdown.",
          "type": "string"
        },
        "reasoning": {
          "description": "Provide your thought process and rationale while answering the question.",
          "type": "string"
        },
        "breakdown": {
          "description": "Detail the reasoning for each option, explaining why it is correct or incorrect.",
          "type": "string"
        },
        "confusion": {
          "description": "What is the source of your confusion?",
          "type": "string"
        },
        "suggestions": {
          "description": "What would you suggest to improve the question or in the chapter wrt to this question?",
          "type": "string"
        }
      },
      "required": [
        "answer",
        "reasoning",
        "interpretation",
        "breakdown",
        "confusion",
        "suggestions"
      ]
    },
    "correctAnswers": [
      "It is a primary lever for controlling Content Determinism.",
      "Dynamic temperature adjustment allows varying Content Determinism during a single execution.",
      "Temperature segmentation applies different settings to parts of a task for varied Content Determinism.",
      "Lower temperatures generally lead to less varied and more predictable content.",
      "Higher temperatures are suitable for exploratory content generation.",
      "Near-zero temperature aims for maximum content certainty in LLM outputs."
    ]
  },
  "Q4": {
    "schema": {
      "type": "object",
      "description": "Question: What are primary considerations for Model Selection in determinism control?",
      "properties": {
        "answer": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "A model's inherent tendency to adhere to structural formatting (Structural Determinism).",
              "A model's natural bias towards factual or creative output (Content Determinism).",
              "The required \"smartness\" or reasoning capability for the task's complexity, affecting both spectra.",
              "Always choosing the largest available model to maximize determinism.",
              "Balancing the desired determinism profile across both spectra with resource efficiency and cost.",
              "Selecting models based only on their temperature sensitivity.",
              "The model's ability to process the necessary input context size for the task.",
              "Ensuring all tasks use models with guaranteed JSON output, regardless of need.",
              "The expected complexity and size of the output.",
              "Prioritizing models with the most recent training data above all else."
            ]
          }
        },
        "interpretation": {
          "description": "Clarify your understanding of what the question is asking by briefly explaining each term used in the question. Avoid discussing the options - that is for breakdown.",
          "type": "string"
        },
        "reasoning": {
          "description": "Provide your thought process and rationale while answering the question.",
          "type": "string"
        },
        "breakdown": {
          "description": "Detail the reasoning for each option, explaining why it is correct or incorrect.",
          "type": "string"
        },
        "confusion": {
          "description": "What is the source of your confusion?",
          "type": "string"
        },
        "suggestions": {
          "description": "What would you suggest to improve the question or in the chapter wrt to this question?",
          "type": "string"
        }
      },
      "required": [
        "answer",
        "reasoning",
        "interpretation",
        "breakdown",
        "confusion",
        "suggestions"
      ]
    },
    "correctAnswers": [
      "A model's inherent tendency to adhere to structural formatting (Structural Determinism).",
      "A model's natural bias towards factual or creative output (Content Determinism).",
      "The required \"smartness\" or reasoning capability for the task's complexity, affecting both spectra.",
      "Balancing the desired determinism profile across both spectra with resource efficiency and cost.",
      "The model's ability to process the necessary input context size for the task.",
      "The expected complexity and size of the output."
    ]
  },
  "Q5": {
    "schema": {
      "type": "object",
      "description": "Question: What are the different types of validation strategies and how do they contribute to process safety and determinism?",
      "properties": {
        "answer": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "Programmatic validation uses code for structural checks (like schema adherence) and rule-based content verification.",
              "AI-powered validation employs other AI models for semantic assessments (factual accuracy, tone) and recognizing subtle pattern deviations in structure or content.",
              "Human-in-the-Loop validation introduces human oversight for reviewing, correcting, and providing feedback on outputs, especially for critical or ambiguous cases.",
              "These strategies can be layered in pipelines to enforce both Structural Determinism (blueprint adherence) and Content Determinism (output quality/factuality).",
              "Programmatic validation is only suitable for checking content, not structure.",
              "AI-powered validation is primarily used for simple format checks, not semantic understanding.",
              "Human-in-the-Loop validation is only for correcting structural errors and cannot provide feedback for AI model improvement.",
              "Each validation type operates in isolation and cannot be combined into multi-stage pipelines.",
              "Validation strategies primarily aim to increase the creative flexibility of outputs, not to enforce standards.",
              "The main goal of validation is to replace the need for clear instructions or well-defined processes."
            ]
          }
        },
        "interpretation": {
          "description": "Clarify your understanding of what the question is asking by briefly explaining each term used in the question. Avoid discussing the options - that is for breakdown.",
          "type": "string"
        },
        "reasoning": {
          "description": "Provide your thought process and rationale while answering the question.",
          "type": "string"
        },
        "breakdown": {
          "description": "Detail the reasoning for each option, explaining why it is correct or incorrect.",
          "type": "string"
        },
        "confusion": {
          "description": "What is the source of your confusion?",
          "type": "string"
        },
        "suggestions": {
          "description": "What would you suggest to improve the question or in the chapter wrt to this question?",
          "type": "string"
        }
      },
      "required": [
        "answer",
        "reasoning",
        "interpretation",
        "breakdown",
        "confusion",
        "suggestions"
      ]
    },
    "correctAnswers": [
      "Programmatic validation uses code for structural checks (like schema adherence) and rule-based content verification.",
      "AI-powered validation employs other AI models for semantic assessments (factual accuracy, tone) and recognizing subtle pattern deviations in structure or content.",
      "Human-in-the-Loop validation introduces human oversight for reviewing, correcting, and providing feedback on outputs, especially for critical or ambiguous cases.",
      "These strategies can be layered in pipelines to enforce both Structural Determinism (blueprint adherence) and Content Determinism (output quality/factuality)."
    ]
  },
  "Q6": {
    "schema": {
      "type": "object",
      "description": "Question: How does the system approach determinism strategies for different tasks, considering the two spectra?",
      "properties": {
        "answer": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "By applying a uniform level of Structural and Content Determinism to all tasks.",
              "By tailoring controls on both Structural and Content Determinism spectra to each task type's needs.",
              "By always maximizing Structural Determinism, regardless of task, and varying only Content Determinism.",
              "By recognizing that different tasks (e.g., creative vs. critical) require different balances across the two determinism spectra.",
              "By dynamically selecting and configuring mechanisms based on task categorization to achieve a target profile in the 2D determinism space.",
              "For example, creative tasks might aim for low structural rigidity and high content variety.",
              "By using a fixed set of determinism levers for all tasks, only adjusting their intensity.",
              "By aiming for an appropriate balance that might mean high structural rigidity but allowing some content flexibility for certain analysis tasks.",
              "Critical tasks would aim for high settings on both Structural and Content Determinism spectra.",
              "By disabling all determinism controls for tasks classified as \"creative.\"",
              "Creative tasks: Low Structural Determinism (e.g. open-ended instructions) and Low Content Determinism (e.g. high temperature).",
              "Operational tasks: High Structural Determinism (e.g. detailed processes) and High Content Determinism (e.g. low temperature).",
              "Critical tasks: Maximum Structural Determinism (e.g. programmatic implementation) and Maximum Content Determinism.",
              "Analysis tasks might use medium temperature (Content) and structured analytical frameworks (Structural).",
              "For creative tasks, generation of multiple diverse outputs (Content) followed by filtering is a valid strategy."
            ]
          }
        },
        "interpretation": {
          "description": "Clarify your understanding of what the question is asking by briefly explaining each term used in the question. Avoid discussing the options - that is for breakdown.",
          "type": "string"
        },
        "reasoning": {
          "description": "Provide your thought process and rationale while answering the question.",
          "type": "string"
        },
        "breakdown": {
          "description": "Detail the reasoning for each option, explaining why it is correct or incorrect.",
          "type": "string"
        },
        "confusion": {
          "description": "What is the source of your confusion?",
          "type": "string"
        },
        "suggestions": {
          "description": "What would you suggest to improve the question or in the chapter wrt to this question?",
          "type": "string"
        }
      },
      "required": [
        "answer",
        "reasoning",
        "interpretation",
        "breakdown",
        "confusion",
        "suggestions"
      ]
    },
    "correctAnswers": [
      "By tailoring controls on both Structural and Content Determinism spectra to each task type's needs.",
      "By recognizing that different tasks (e.g., creative vs. critical) require different balances across the two determinism spectra.",
      "By dynamically selecting and configuring mechanisms based on task categorization to achieve a target profile in the 2D determinism space.",
      "For example, creative tasks might aim for low structural rigidity and high content variety.",
      "By aiming for an appropriate balance that might mean high structural rigidity but allowing some content flexibility for certain analysis tasks.",
      "Critical tasks would aim for high settings on both Structural and Content Determinism spectra.",
      "Creative tasks: Low Structural Determinism (e.g. open-ended instructions) and Low Content Determinism (e.g. high temperature).",
      "Operational tasks: High Structural Determinism (e.g. detailed processes) and High Content Determinism (e.g. low temperature).",
      "Critical tasks: Maximum Structural Determinism (e.g. programmatic implementation) and Maximum Content Determinism.",
      "Analysis tasks might use medium temperature (Content) and structured analytical frameworks (Structural).",
      "For creative tasks, generation of multiple diverse outputs (Content) followed by filtering is a valid strategy."
    ]
  }
} as const;
