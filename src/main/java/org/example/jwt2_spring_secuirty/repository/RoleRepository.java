package org.example.jwt2_spring_secuirty.repository;



import org.example.jwt2_spring_secuirty.entity.Role;
import org.example.jwt2_spring_secuirty.entity.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(RoleName name);
}
