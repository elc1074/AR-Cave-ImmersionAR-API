import fastify from 'fastify';
import { supabase } from './supabaseConnection';
import { CreateDrawingInput, UpdateDrawingInput } from './types/Drawing';
import { CreateUserInput } from './types/User';
import dotenv from 'dotenv';
import fastifyCors from "@fastify/cors";

// Carregar variáveis de ambiente
dotenv.config();

const app = fastify();


app.get('/users', async () => {
   try {
        const { data, error } = await supabase.from('users').select('*');
        return { value: data };
   } catch (error){
      console.error('Error fetching users:', error);
      throw error;
   }

});

app.post('/users', async (request, reply) => {
    try { 
        const { name } = request.body as { name: string };
        const { data, error } = await supabase.from('users').insert([{ name }]).select();
        if (error) throw error;
        reply.code(201).send({ value: data });
    } catch (error) {
        console.error('Error creating user:', error);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
});

// Rota para buscar todos os desenhos
app.get('/drawings', async (request, reply) => {
    try {
        const { data, error } = await supabase
            .from('drawings')
            .select(`
                id,
                user_id,
                dados,
                cor,
                created_at,
                updated_at,
                users (
                    id,
                    name
                )
            `);
        
        if (error) throw error;
        
        reply.code(200).send({ value: data });
    } catch (error) {
        console.error('Error fetching drawings:', error);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
});

// Rota para buscar desenhos por usuário
app.get('/drawings/user/:userId', async (request, reply) => {
    try {
        const { userId } = request.params as { userId: string };
        
        const { data, error } = await supabase
            .from('drawings')
            .select(`
                id,
                user_id,
                dados,
                cor,
                created_at,
                updated_at,
                users (
                    id,
                    name
                )
            `)
            .eq('user_id', userId);
        
        if (error) throw error;
        
        reply.code(200).send({ value: data });
    } catch (error) {
        console.error('Error fetching user drawings:', error);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
});

// Rota para criar um novo desenho
app.post('/drawings', async (request, reply) => {
    try {
        const { user_id, dados, cor } = request.body as {
            user_id: number;
            dados: any;
            cor?: string;
        };

        // Verificar se o usuário existe
        const { data: userExists, error: userError } = await supabase
            .from('users')
            .select('id')
            .eq('id', user_id)
            .single();

        if (userError || !userExists) {
            reply.code(404).send({ error: 'Usuário não encontrado' });
            return;
        }

        const { data, error } = await supabase
            .from('drawings')
            .insert([{
                user_id,
                dados,
                cor: cor || '#000000' // cor padrão se não fornecida
            }])
            .select(`
                id,
                user_id,
                dados,
                cor,
                created_at,
                updated_at,
                users (
                    id,
                    name
                )
            `);

        if (error) throw error;

        reply.code(201).send({ value: data });
    } catch (error) {
        console.error('Error creating drawing:', error);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
});

// Rota para atualizar um desenho
app.put('/drawings/:id', async (request, reply) => {
    try {
        const { id } = request.params as { id: string };
        const { dados, cor } = request.body as {
            dados?: any;
            cor?: string;
        };

        const updateData: any = {};
        if (dados !== undefined) updateData.dados = dados;
        if (cor !== undefined) updateData.cor = cor;
        updateData.updated_at = new Date().toISOString();

        const { data, error } = await supabase
            .from('drawings')
            .update(updateData)
            .eq('id', id)
            .select(`
                id,
                user_id,
                dados,
                cor,
                created_at,
                updated_at,
                users (
                    id,
                    name
                )
            `);

        if (error) throw error;

        if (!data || data.length === 0) {
            reply.code(404).send({ error: 'Desenho não encontrado' });
            return;
        }

        reply.code(200).send({ value: data });
    } catch (error) {
        console.error('Error updating drawing:', error);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
});

// Rota para deletar um desenho
app.delete('/drawings/:id', async (request, reply) => {
    try {
        const { id } = request.params as { id: string };

        const { data, error } = await supabase
            .from('drawings')
            .delete()
            .eq('id', id)
            .select();

        if (error) throw error;

        if (!data || data.length === 0) {
            reply.code(404).send({ error: 'Desenho não encontrado' });
            return;
        }

        reply.code(200).send({ message: 'Desenho deletado com sucesso' });
    } catch (error) {
        console.error('Error deleting drawing:', error);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
});

// Inicialização do servidor
const start = async () => {
    await app.register(fastifyCors, {
        origin: true,
    });
    try {
        const port = process.env.PORT || 3000;
        const host = '0.0.0.0';
        
        await app.listen({ 
            port: Number(port), 
            host: host 
        });
        
        console.log(`🚀 Servidor rodando em http://${host}:${port}`);
        console.log(`📊 Rotas disponíveis:`);
        console.log(`  GET    /users          - Listar usuários`);
        console.log(`  POST   /users          - Criar usuário`);
        console.log(`  GET    /drawings       - Listar todos os desenhos`);
        console.log(`  GET    /drawings/user/:userId - Listar desenhos por usuário`);
        console.log(`  POST   /drawings       - Criar novo desenho`);
        console.log(`  PUT    /drawings/:id   - Atualizar desenho`);
        console.log(`  DELETE /drawings/:id   - Deletar desenho`);
    } catch (err) {
        console.error('❌ Erro ao iniciar servidor:', err);
        process.exit(1);
    }
};

start();