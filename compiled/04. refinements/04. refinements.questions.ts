export const questions = {
  "Q1": {
    "schema": {
      "type": "object",
      "description": "Question: What are the three mandatory arguments for the `refine` primitive?",
      "properties": {
        "answer": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "`target`: The Vibe to be refined or the template to spawn from.",
              "`instruction`: The Vibe describing how the refinement should occur.",
              "`capability`: The Vibe providing proof-of-authority for the refinement.",
              "`resources`: The vibe representing access to budget or proof of previous successes."
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
      "`target`: The Vibe to be refined or the template to spawn from.",
      "`instruction`: The Vibe describing how the refinement should occur.",
      "`capability`: The Vibe providing proof-of-authority for the refinement."
    ]
  },
  "Q2": {
    "schema": {
      "type": "object",
      "description": "Question: What is a guaranteed characteristic of the `refine` primitive's output?",
      "properties": {
        "answer": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "It always produces a new, immutable Vibe.",
              "It modifies the `target` in-place.",
              "It can sometimes return multiple new Vibes.",
              "The `capability` is consumed and invalidated after use.",
              "It always requires LLM intervention to complete."
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
      "It always produces a new, immutable Vibe."
    ]
  },
  "Q3": {
    "schema": {
      "type": "object",
      "description": "Question: If a Capability `C1` is used to authorize the creation of a permit `PermitB` within a new Capability `C2` (so `PermitB`'s `metadata.issuerRef` points to `C1`), what happens if `C1` is subsequently revoked?",
      "properties": {
        "answer": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "`C1` is marked as void (e.g., by a successor Vibe). Consequently, `PermitB` in `C2` becomes void because its authority (`issuerRef` = `C1`) is no longer valid. `C2` itself is not directly revoked but may become ineffective if it has no other valid permits.",
              "`C1` is deleted from the system, which automatically deletes `C2`.",
              "`C2` and `PermitB` remain fully valid because `C2` was already created and its permits define its own capabilities.",
              "The `issuerRef` in `PermitB`'s metadata is automatically updated to point to `C1`'s parent or a system default."
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
      "`C1` is marked as void (e.g., by a successor Vibe). Consequently, `PermitB` in `C2` becomes void because its authority (`issuerRef` = `C1`) is no longer valid. `C2` itself is not directly revoked but may become ineffective if it has no other valid permits."
    ]
  },
  "Q4": {
    "schema": {
      "type": "object",
      "description": "Question: How is the initial `capability` for the first refinements provided?",
      "properties": {
        "answer": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "It is provided by platform administrators/owners as a foundational license.",
              "It is generated automatically from the `target`.",
              "The user creates it using a special command.",
              "It is cloned from the `instruction`."
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
      "It is provided by platform administrators/owners as a foundational license."
    ]
  },
  "Q5": {
    "schema": {
      "type": "object",
      "description": "Question: What serves as the initial `targets` in the bootstrapping phase?",
      "properties": {
        "answer": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "Minimal, initial template Vibes provided by the platform (e.g., for Vessels, Processes, Data).",
              "The user must create these from scratch using external tools.",
              "Any existing Vibe in a public repository can be used.",
              "The `capability` itself also acts as the first `target`."
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
      "Minimal, initial template Vibes provided by the platform (e.g., for Vessels, Processes, Data)."
    ]
  },
  "Q6": {
    "schema": {
      "type": "object",
      "description": "Question: What is the \"schema **refinement** principle\" in the context of **refining** base templates?",
      "properties": {
        "answer": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "Resulting schemas should generally be specializations (`narrowed` versions), adding detail within the template's conceptual boundaries.",
              "Schemas can be arbitrarily widened without restriction.",
              "Resulting schemas should generally be specializations (`narrowed` versions), adding detail within the template's conceptual boundaries.",
              "Schemas can be arbitrarily widened without restriction.",
              "The schema of the base template is deleted and replaced entirely.",
              "Only the `solution` part of the Vibe can be changed, not the schema.",
              "To convert a Record Vibe's schema into a Process Vibe's schema."
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
      "Resulting schemas should generally be specializations (`narrowed` versions), adding detail within the template's conceptual boundaries.",
      "Resulting schemas should generally be specializations (`narrowed` versions), adding detail within the template's conceptual boundaries."
    ]
  },
  "Q7": {
    "schema": {
      "type": "object",
      "description": "Question: What is the final condition for `refine` to be approved by a Capability (or set of Capabilities)?",
      "properties": {
        "answer": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "At least one permit within at least one of the `capability.solutions` must validate the `targets` Vibe(s) and `instructions` Vibe(s) against its defined schemas and have valid metadata.",
              "All permits within all presented `capability.solutions` must unanimously approve the call to `refine`.",
              "All permits within all presented `capability.solutions` must unanimously approve the attempt to `refine`.",
              "The `target` Vibe must contain a special marker indicating it allows refining by the presented `capability`.",
              "The `instruction` Vibe must be digitally signed by the issuer of the `capability`.",
              "The `capability` must have a global `allowAllRefine` flag set to true."
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
      "At least one permit within at least one of the `capability.solutions` must validate the `targets` Vibe(s) and `instructions` Vibe(s) against its defined schemas and have valid metadata."
    ]
  },
  "Q8": {
    "schema": {
      "type": "object",
      "description": "Question: During the authorization process for a `refine` call, what aspects of a permit are checked?",
      "properties": {
        "answer": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "The permit's own metadata (e.g., expiration, recipient).",
              "Conformance of the `refine` call's `targets` Vibe(s) to the permit's `target` schema.",
              "Conformance of the `refine` call's `instructions` Vibe(s) to the permit's `instruction` schema.",
              "Conformance of the `refine` call's `resources` Vibe(s) (if any and if specified by the permit) to the permit's `resources` schema.",
              "The historical number of times the permit has been successfully used.",
              "The computational cost of the proposed `refine` operation."
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
      "The permit's own metadata (e.g., expiration, recipient).",
      "Conformance of the `refine` call's `targets` Vibe(s) to the permit's `target` schema.",
      "Conformance of the `refine` call's `instructions` Vibe(s) to the permit's `instruction` schema.",
      "Conformance of the `refine` call's `resources` Vibe(s) (if any and if specified by the permit) to the permit's `resources` schema."
    ]
  },
  "Q9": {
    "schema": {
      "type": "object",
      "description": "Question: What is the primary goal of \"schema **refinement**\"?",
      "properties": {
        "answer": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "To make a Vibe's `schema` definition more specific while preserving its core conceptual nature and ensuring compatibility with systems expecting the original schema.",
              "To completely change a Vibe's `schema` definition into something unrelated.",
              "To reduce the number of fields in a Vibe's `schema` definition to make it simpler.",
              "To make a Vibe's `schema` definition more generic and less constrained.",
              "To convert a Record Vibe's schema into a Process Vibe's schema."
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
      "To make a Vibe's `schema` definition more specific while preserving its core conceptual nature and ensuring compatibility with systems expecting the original schema."
    ]
  },
  "Q10": {
    "schema": {
      "type": "object",
      "description": "Question: How does schema **refinement** manifest in a Capability Vibe?",
      "properties": {
        "answer": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "Its permits (its \"schema of authority\") become more restrictive, often representing delegation, including constraints on targets, instructions, and resources.",
              "New, unrelated tools are added to its `solution`.",
              "Its permits (its \"schema of authority\") become more restrictive, often representing delegation, including constraints on targets, instructions, and resources.",
              "New, unrelated tools are added to its `solution`.",
              "The `target` schema it can operate on becomes broader.",
              "Its `issuerRef` metadata is removed.",
              "It gains the ability to bypass `refine` operations.",
              "It gains the ability to bypass `refine`."
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
      "Its permits (its \"schema of authority\") become more restrictive, often representing delegation, including constraints on targets, instructions, and resources.",
      "Its permits (its \"schema of authority\") become more restrictive, often representing delegation, including constraints on targets, instructions, and resources."
    ]
  },
  "Q11": {
    "schema": {
      "type": "object",
      "description": "Question: What is the outcome of schema **refinement** on a Role Vibe?",
      "properties": {
        "answer": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "Its `schema` definition (tool/meme collection and orchestration) becomes more specialized.",
              "It transforms into a Process Vibe.",
              "It loses all its embedded tools.",
              "Its ability to activate tools concurrently is removed.",
              "It can only produce Record Vibe `solutions`."
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
      "Its `schema` definition (tool/meme collection and orchestration) becomes more specialized."
    ]
  },
  "Q12": {
    "schema": {
      "type": "object",
      "description": "Question: What are the two main scenarios for evolving Record Vibe schemas as described?",
      "properties": {
        "answer": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "Additive Refinement: Adding new fields or tightening constraints on the existing schema.",
              "Major Version Migration: Defining a new schema version and transforming data from old Vibes to conform to it.",
              "Schema Deletion: Removing the schema field entirely from a Record Vibe.",
              "Automatic Schema Generalization: The system automatically makes schemas less specific over time."
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
      "Additive Refinement: Adding new fields or tightening constraints on the existing schema.",
      "Major Version Migration: Defining a new schema version and transforming data from old Vibes to conform to it."
    ]
  },
  "Q13": {
    "schema": {
      "type": "object",
      "description": "Question: How does the system ensure that when you `refine`, it is controlled and auditable?",
      "properties": {
        "answer": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "By verifying that the presented `Capabilitys` contains a valid permit explicitly authorizing the `targets` Vibe(s) to be transformed by the specific `instructions` Vibe(s), potentially requiring specific `resources` Vibe(s).",
              "By requiring all `refine` calls to be approved by a human administrator in real-time.",
              "By encrypting all `instructions` Vibes so only authorized `targets` Vibes can decrypt them.",
              "By limiting `refine` to only affect the `solution` field, never the `schema` field.",
              "By allowing any Vibe to be a `capability` as long as its name starts with \"permit-\"."
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
      "By verifying that the presented `Capabilitys` contains a valid permit explicitly authorizing the `targets` Vibe(s) to be transformed by the specific `instructions` Vibe(s), potentially requiring specific `resources` Vibe(s)."
    ]
  }
} as const;
