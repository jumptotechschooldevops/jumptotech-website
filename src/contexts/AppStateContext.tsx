"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { modules as initialModules, Module, Lecture } from "@/lib/data";

export type ChatMessage = {
  id: string;
  sender: "user" | "bot" | "admin";
  text: string;
  timestamp: string;
};

export type StudentProject = {
  id: string;
  studentName: string;
  url: string;
  description: string;
  feedback: string;
  status: "pending" | "reviewed";
  timestamp: string;
};

export type ModuleWithVisibility = Module & { isPublished?: boolean };
export type LectureWithVisibility = Lecture & { isVisible?: boolean };

type AppStateContextType = {
  modulesData: ModuleWithVisibility[];
  chatMessages: ChatMessage[];
  projects: StudentProject[];
  addLecture: (moduleId: string, lecture: LectureWithVisibility) => void;
  deleteLecture: (moduleId: string, lectureId: string) => void;
  reorderLectures: (moduleId: string, newLectures: LectureWithVisibility[]) => void;
  toggleModulePublish: (moduleId: string) => void;
  toggleLectureVisibility: (moduleId: string, lectureId: string) => void;
  markLectureComplete: (moduleId: string, lectureId: string) => void;
  addModule: (module: ModuleWithVisibility) => void;
  addChatMessage: (msg: ChatMessage) => void;
  submitProject: (project: Omit<StudentProject, "id" | "status" | "feedback" | "timestamp">) => void;
  reviewProject: (projectId: string, feedback: string) => void;
};

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [modulesData, setModulesData] = useState<ModuleWithVisibility[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [projects, setProjects] = useState<StudentProject[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load from local storage
    const storedModules = localStorage.getItem("jtt_modules");
    if (storedModules) {
      setModulesData(JSON.parse(storedModules));
    } else {
      setModulesData(initialModules);
    }

    const storedMessages = localStorage.getItem("jtt_chat_messages");
    if (storedMessages) {
      setChatMessages(JSON.parse(storedMessages));
    }

    const storedProjects = localStorage.getItem("jtt_projects");
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    }

    setMounted(true);
  }, []);

  // Sync to local storage on change (only after initial mount)
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("jtt_modules", JSON.stringify(modulesData));
    }
  }, [modulesData, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("jtt_chat_messages", JSON.stringify(chatMessages));
    }
  }, [chatMessages, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("jtt_projects", JSON.stringify(projects));
    }
  }, [projects, mounted]);

  const addLecture = (moduleId: string, lecture: LectureWithVisibility) => {
    setModulesData(prev =>
      prev.map(mod => {
        if (mod.id === moduleId) {
          return {
            ...mod,
            lectures: [...mod.lectures, lecture],
            lectureCount: mod.lectureCount + (lecture.type !== 'lab' ? 1 : 0),
            labCount: mod.labCount + (lecture.type === 'lab' ? 1 : 0)
          };
        }
        return mod;
      })
    );
  };

  const reorderLectures = (moduleId: string, newLectures: LectureWithVisibility[]) => {
    setModulesData(prev =>
      prev.map(mod => mod.id === moduleId ? { ...mod, lectures: newLectures } : mod)
    );
  };

  const toggleModulePublish = (moduleId: string) => {
    setModulesData(prev =>
      prev.map(mod => mod.id === moduleId ? { ...mod, isPublished: mod.isPublished === false ? true : false } : mod)
    );
  };

  const markLectureComplete = (moduleId: string, lectureId: string) => {
    setModulesData(prev =>
      prev.map(mod => {
        if (mod.id === moduleId) {
          return {
            ...mod,
            lectures: mod.lectures.map(l => {
              if (l.id === lectureId) {
                return { ...l, completed: true };
              }
              return l;
            })
          };
        }
        return mod;
      })
    );
  };

  const toggleLectureVisibility = (moduleId: string, lectureId: string) => {
    setModulesData(prev =>
      prev.map(mod => {
        if (mod.id === moduleId) {
          return {
            ...mod,
            lectures: mod.lectures.map(l => {
              if (l.id === lectureId) {
                return { ...l, isVisible: (l as LectureWithVisibility).isVisible === false ? true : false };
              }
              return l;
            })
          };
        }
        return mod;
      })
    );
  };

  const addModule = (module: ModuleWithVisibility) => {
    setModulesData(prev => [...prev, module]);
  };

  const deleteLecture = (moduleId: string, lectureId: string) => {
    setModulesData(prev =>
      prev.map(mod => {
        if (mod.id === moduleId) {
          const lectureToDelete = mod.lectures.find(l => l.id === lectureId);
          if (!lectureToDelete) return mod;

          return {
            ...mod,
            lectures: mod.lectures.filter(l => l.id !== lectureId),
            lectureCount: mod.lectureCount - (lectureToDelete.type !== 'lab' ? 1 : 0),
            labCount: mod.labCount - (lectureToDelete.type === 'lab' ? 1 : 0)
          };
        }
        return mod;
      })
    );
  };

  const addChatMessage = (msg: ChatMessage) => {
    setChatMessages(prev => [...prev, msg]);
  };

  const submitProject = (project: Omit<StudentProject, "id" | "status" | "feedback" | "timestamp">) => {
    setProjects(prev => [
      ...prev,
      {
        ...project,
        id: `proj-${Date.now()}`,
        status: "pending",
        feedback: "",
        timestamp: new Date().toISOString()
      }
    ]);
  };

  const reviewProject = (projectId: string, feedback: string) => {
    setProjects(prev =>
      prev.map(p => p.id === projectId ? { ...p, status: "reviewed", feedback } : p)
    );
  };

  if (!mounted) {
    // Return empty children or loader to avoid hydration mismatch if needed
    // But since it's just state, we can render children and they might use empty state momentarily.
    // It's better to just render children.
  }

  return (
    <AppStateContext.Provider value={{
      modulesData: mounted ? modulesData : initialModules,
      chatMessages,
      projects,
      addLecture,
      deleteLecture,
      reorderLectures,
      toggleModulePublish,
      toggleLectureVisibility,
      markLectureComplete,
      addModule,
      addChatMessage,
      submitProject,
      reviewProject
    }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
}
