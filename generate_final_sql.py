import re

with open('supabase/migrations/003_module_data.sql', 'r') as f:
    sql = f.read()

# Replace any existing ON CONFLICT (slug) DO NOTHING with ON CONFLICT (id) DO NOTHING just to be safe for our data inserts
# Actually we can just keep ON CONFLICT (slug) DO NOTHING for modules, and append ON CONFLICT (id) DO NOTHING to others
sql = sql.replace("ON CONFLICT (slug) DO NOTHING;", "ON CONFLICT (id) DO NOTHING;")

# add ON CONFLICT (id) DO NOTHING to all inserts that don't have it
sql = re.sub(r'(INSERT INTO public.lectures[^\;]+)', r'\1 ON CONFLICT (id) DO NOTHING', sql)
sql = re.sub(r'(INSERT INTO public.labs[^\;]+)', r'\1 ON CONFLICT (id) DO NOTHING', sql)
sql = re.sub(r'(INSERT INTO public.quizzes[^\;]+)', r'\1 ON CONFLICT (id) DO NOTHING', sql)
sql = re.sub(r'(INSERT INTO public.quiz_questions[^\;]+)', r'\1 ON CONFLICT (id) DO NOTHING', sql)
sql = re.sub(r'(INSERT INTO public.modules[^\;]+) ON CONFLICT \(id\) DO NOTHING', r'\1 ON CONFLICT (id) DO NOTHING', sql)

with open('final_migration.sql', 'w') as f:
    f.write(sql)
