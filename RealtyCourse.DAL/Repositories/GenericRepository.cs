using Microsoft.EntityFrameworkCore;
using RealtyCourse.Business.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RealtyCourse.DAL.Repositories
{
    public class GenericRepository<TEntity, TContext> : IDisposable
        where TEntity : class
        where TContext: DbContext
    {
        private TContext _dbContext;
        private DbSet<TEntity> _dbSet;
        private bool disposed;

        public GenericRepository(TContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = _dbContext.Set<TEntity>();
        }

        public TEntity Get(int id)
        {
            return _dbSet.Find(id);
        }

        public TEntity GetWithoutTracking(Func<TEntity, bool> condition)
        {
            return _dbSet.AsNoTracking().FirstOrDefault(condition);
        }

        public IQueryable<TEntity> GetAll()
        {
            return _dbSet;
        }

        public IQueryable<TEntity> GetAllWithoutTracking()
        {
            return _dbSet.AsNoTracking();
        }


        public void Add(TEntity item)
        {
            _dbSet.Add(item);
        }


        public void Delete(TEntity item)
        {
            _dbSet.Remove(item);
        }


        public void Update(TEntity item)
        {
            _dbContext.Entry(item).State = EntityState.Modified;
        }
        public void Save()
        {
            _dbContext.SaveChanges();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if(!this.disposed)
            {
                if(disposing)
                {
                    _dbContext.Dispose();
                }
            }
            this.disposed = true;
        }
    }
}
