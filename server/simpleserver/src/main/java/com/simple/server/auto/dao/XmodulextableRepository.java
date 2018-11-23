package com.simple.server.auto.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.entity.*;

public interface XmodulextableRepository extends JpaRepository<Xmodulextable, Long> {
    public  List<Xmodulextable> findByName(String name);
    public  List<Xmodulextable> findByNameLike(String name);

    public  Xmodulextable findOneByName(String name);

    
       public List<Xmodulextable> findByXmoduleId(Long id);

                   
       public List<Xmodulextable> findByXmoduleName(Long id);

                   
       public List<Xmodulextable> findByXtableId(Long id);

                   
       public List<Xmodulextable> findByXtableName(Long id);

                   
}
