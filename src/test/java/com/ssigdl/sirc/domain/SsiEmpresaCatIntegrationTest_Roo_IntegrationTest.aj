// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.ssigdl.sirc.domain;

import com.ssigdl.sirc.domain.SsiEmpresaCatDataOnDemand;
import com.ssigdl.sirc.domain.SsiEmpresaCatIntegrationTest;
import com.ssigdl.sirc.entity.SsiEmpresaCat;

import java.util.Iterator;
import java.util.List;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

privileged aspect SsiEmpresaCatIntegrationTest_Roo_IntegrationTest {
    
    declare @type: SsiEmpresaCatIntegrationTest: @RunWith(SpringJUnit4ClassRunner.class);
    
    declare @type: SsiEmpresaCatIntegrationTest: @ContextConfiguration(locations = "classpath*:/META-INF/spring/applicationContext*.xml");
    
    declare @type: SsiEmpresaCatIntegrationTest: @Transactional;
    
    @Autowired
    SsiEmpresaCatDataOnDemand SsiEmpresaCatIntegrationTest.dod;
    
    @Test
    public void SsiEmpresaCatIntegrationTest.testCountSsiEmpresaCats() {
        Assert.assertNotNull("Data on demand for 'SsiEmpresaCat' failed to initialize correctly", dod.getRandomSsiEmpresaCat());
        long count = SsiEmpresaCat.countSsiEmpresaCats();
        Assert.assertTrue("Counter for 'SsiEmpresaCat' incorrectly reported there were no entries", count > 0);
    }
    
    @Test
    public void SsiEmpresaCatIntegrationTest.testFindSsiEmpresaCat() {
        SsiEmpresaCat obj = dod.getRandomSsiEmpresaCat();
        Assert.assertNotNull("Data on demand for 'SsiEmpresaCat' failed to initialize correctly", obj);
        Integer id = obj.getEmpcId();
        Assert.assertNotNull("Data on demand for 'SsiEmpresaCat' failed to provide an identifier", id);
        obj = SsiEmpresaCat.findSsiEmpresaCat(id);
        Assert.assertNotNull("Find method for 'SsiEmpresaCat' illegally returned null for id '" + id + "'", obj);
        Assert.assertEquals("Find method for 'SsiEmpresaCat' returned the incorrect identifier", id, obj.getEmpcId());
    }
    
    @Test
    public void SsiEmpresaCatIntegrationTest.testFindAllSsiEmpresaCats() {
        Assert.assertNotNull("Data on demand for 'SsiEmpresaCat' failed to initialize correctly", dod.getRandomSsiEmpresaCat());
        long count = SsiEmpresaCat.countSsiEmpresaCats();
        Assert.assertTrue("Too expensive to perform a find all test for 'SsiEmpresaCat', as there are " + count + " entries; set the findAllMaximum to exceed this value or set findAll=false on the integration test annotation to disable the test", count < 250);
        List<SsiEmpresaCat> result = SsiEmpresaCat.findAllSsiEmpresaCats();
        Assert.assertNotNull("Find all method for 'SsiEmpresaCat' illegally returned null", result);
        Assert.assertTrue("Find all method for 'SsiEmpresaCat' failed to return any data", result.size() > 0);
    }
    
    @Test
    public void SsiEmpresaCatIntegrationTest.testFindSsiEmpresaCatEntries() {
        Assert.assertNotNull("Data on demand for 'SsiEmpresaCat' failed to initialize correctly", dod.getRandomSsiEmpresaCat());
        long count = SsiEmpresaCat.countSsiEmpresaCats();
        if (count > 20) count = 20;
        int firstResult = 0;
        int maxResults = (int) count;
        List<SsiEmpresaCat> result = SsiEmpresaCat.findSsiEmpresaCatEntries(firstResult, maxResults);
        Assert.assertNotNull("Find entries method for 'SsiEmpresaCat' illegally returned null", result);
        Assert.assertEquals("Find entries method for 'SsiEmpresaCat' returned an incorrect number of entries", count, result.size());
    }
    
    @Test
    public void SsiEmpresaCatIntegrationTest.testPersist() {
        Assert.assertNotNull("Data on demand for 'SsiEmpresaCat' failed to initialize correctly", dod.getRandomSsiEmpresaCat());
        SsiEmpresaCat obj = dod.getNewTransientSsiEmpresaCat(Integer.MAX_VALUE);
        Assert.assertNotNull("Data on demand for 'SsiEmpresaCat' failed to provide a new transient entity", obj);
        Assert.assertNull("Expected 'SsiEmpresaCat' identifier to be null", obj.getEmpcId());
        try {
            obj.persist();
        } catch (final ConstraintViolationException e) {
            final StringBuilder msg = new StringBuilder();
            for (Iterator<ConstraintViolation<?>> iter = e.getConstraintViolations().iterator(); iter.hasNext();) {
                final ConstraintViolation<?> cv = iter.next();
                msg.append("[").append(cv.getRootBean().getClass().getName()).append(".").append(cv.getPropertyPath()).append(": ").append(cv.getMessage()).append(" (invalid value = ").append(cv.getInvalidValue()).append(")").append("]");
            }
            throw new IllegalStateException(msg.toString(), e);
        }
        obj.flush();
        Assert.assertNotNull("Expected 'SsiEmpresaCat' identifier to no longer be null", obj.getEmpcId());
    }
    
    @Test
    public void SsiEmpresaCatIntegrationTest.testRemove() {
        SsiEmpresaCat obj = dod.getRandomSsiEmpresaCat();
        Assert.assertNotNull("Data on demand for 'SsiEmpresaCat' failed to initialize correctly", obj);
        Integer id = obj.getEmpcId();
        Assert.assertNotNull("Data on demand for 'SsiEmpresaCat' failed to provide an identifier", id);
        obj = SsiEmpresaCat.findSsiEmpresaCat(id);
        obj.remove();
        obj.flush();
        Assert.assertNull("Failed to remove 'SsiEmpresaCat' with identifier '" + id + "'", SsiEmpresaCat.findSsiEmpresaCat(id));
    }
    
}
